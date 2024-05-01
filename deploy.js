import Rsync from 'rsync';
import { NodeSSH } from 'node-ssh';
import path from 'path';
import { readFileSync } from 'fs';

const packageInfo = JSON.parse(
    readFileSync(path.resolve(process.cwd(), './package.json'), 'utf8'),
);

const PACKAGE_NAME = packageInfo.name;
const HOST = '194.146.25.179';
const USER = 'root';
const KEY_PATH = path.resolve('/Users/moroz/.ssh/id_rsa');
const DEST_CWD = `/root/${PACKAGE_NAME}`;

export async function deploy() {
    await copyToRemote();
    const remoteJobRunner = await RemoteJob();
    await remoteJobRunner.updateModules();
    await remoteJobRunner.rerunPm2();

    remoteJobRunner.end();
}

// https://dev.to/somedood/the-proper-way-to-write-async-constructors-in-javascript-1o8c

async function RemoteJob() {
    const ssh = new NodeSSH();
    await ssh.connect({
        host: HOST,
        username: USER,
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
        return runCommand('npm install --omit=dev');
    }

    function rerunPm2(pm2Name) {
        pm2Name = pm2Name || PACKAGE_NAME;
        return runCommand(`pm2 restart ${pm2Name}`);
    }

    const api = {
        runCommand,
        updateModules,
        rerunPm2,
        end,
    };

    return api;
}

function copyToRemote() {
    const rsync = new Rsync()
        .set('rsh', `ssh -i ${KEY_PATH}`)
        .flags('az')
        .source('./server')
        .source('./public')
        .source('./package.json')
        .destination(`${USER}@${HOST}:${DEST_CWD}`);

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
