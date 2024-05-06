import Rsync from 'rsync';
import { NodeSSH } from 'node-ssh';
import path from 'path';
import { readFileSync } from 'fs';

const packageInfo = JSON.parse(
    readFileSync(path.resolve(process.cwd(), './package.json'), 'utf8'),
);

const PACKAGE_NAME = packageInfo.name;
const PACKAGE_VERSION = packageInfo.version;
const REMOTE_HOST = 'r1.com';
const REMOTE_USER = 'root';
const KEY_PATH = path.resolve(`${process.env.HOME}/.ssh/id_rsa`);
const DEST_CWD = `/${REMOTE_USER}/${PACKAGE_NAME}`;

export async function deploy() {
    await deployServer();
    await Promise.all([copyClient('latest'), copyClient(PACKAGE_VERSION)]);
}

async function deployServer() {
    await copyServer();
    const remoteJobRunner = await RemoteJob();
    await remoteJobRunner.updateModules();
    // requires first initial run on server
    await remoteJobRunner.rerunPm2();

    return remoteJobRunner.end();
}

// https://dev.to/somedood/the-proper-way-to-write-async-constructors-in-javascript-1o8c

async function RemoteJob() {
    const ssh = new NodeSSH();
    await ssh.connect({
        host: REMOTE_HOST,
        username: REMOTE_USER,
        privateKeyPath: KEY_PATH,
    });

    async function runCommand(command) {
        const { stdout, stderr } = await ssh.execCommand(command, {
            cwd: DEST_CWD,
        });
        console.log(stdout, stderr);
    }

    function end() {
        return ssh.dispose();
    }

    function updateModules() {
        return runCommand('NODE_ENV=production npm install');
    }

    function rerunPm2(pm2Name) {
        pm2Name = pm2Name || PACKAGE_NAME;
        return runCommand(
            `NODE_ENV=production pm2 restart ./server/index.js --name ${pm2Name}`,
        );
    }

    const api = {
        runCommand,
        updateModules,
        rerunPm2,
        end,
    };

    return api;
}
function copyServer() {
    return copyToRemote(['./server', './public', './package.json']);
}
function copyClient(version) {
    return copyToRemote(['./dist'], `/public/${version}`);
}
function copyToRemote(sources, destinationSubPath = '') {
    const rsync = new Rsync()
        .set('rsh', `ssh -i ${KEY_PATH}`)
        .flags('az')
        .source(sources)
        .destination(
            `${REMOTE_USER}@${REMOTE_HOST}:${DEST_CWD}${destinationSubPath}`,
        );

    return new Promise((resolve, reject) => {
        rsync.execute((error, code, cmd) => {
            if (error) {
                reject(error);
            }
            resolve();
        });
    });
}

deploy();
