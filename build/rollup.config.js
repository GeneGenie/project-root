import nodeResolve from '@rollup/plugin-node-resolve';
import clear from 'rollup-plugin-clear';
import eslint from '@rollup/plugin-eslint';
import fs from 'fs';
import { replaceEnvVariables } from './plugins/replaceEnvVariables.js';
import strip from '@rollup/plugin-strip';
const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const entryDir = 'src/entrypoints';
const entries = fs
    .readdirSync(entryDir)
    .map((file) => {
        return file;
    })
    .map((entry) => {
        const logOptions = [0, 1];

        return logOptions.map((hasLogs) => {
            return {
                input: [`src/entrypoints/${entry}`],
                output: [
                    {
                        file: `public/dist/${packageJSON.name}${hasLogs ? '.wl' : ''}.${entry}`,
                        format: 'iife',
                        sourcemap: 'file',
                        name: `${packageJSON.name}.${capitalize(entry.replace('.js', ''))}`,
                    },
                ],
                plugins: [
                    clear({ targets: ['public/dist'] }),
                    replaceEnvVariables(),
                    // https://www.npmjs.com/package/@rollup/plugin-strip
                    !hasLogs &&
                        strip({
                            debugger: true,
                            functions: ['logger.log', 'log', 'Log', 'Log.bind'],
                        }),
                    nodeResolve(),
                    eslint({
                        exclude: ['node_modules/**', './package.json'],
                        throwOnWarning: false,
                        throwOnError: true,
                    }),
                ],
            };
        });
    })
    // reduce flatten
    .reduce((acc, val) => acc.concat(val), []);

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export default entries;
