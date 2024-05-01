import nodeResolve from '@rollup/plugin-node-resolve';
import clear from 'rollup-plugin-clear';
import eslint from '@rollup/plugin-eslint';
import fs from 'fs';
import { replaceEnvVariables } from './plugins/replaceEnvVariables.js';

const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

const entryDir = 'src/entrypoints';
const entries = fs.readdirSync(entryDir).map((file) => {
    return file;
});
export default entries.map((entry) => {
    return {
        input: [`src/entrypoints/${entry}`],
        output: [
            {
                file: `public/dist/${packageJSON.name}-${entry}`,
                format: 'iife',
                sourcemap: 'file',
                name: `${packageJSON.name}${capitalize(entry.replace('.js', ''))}`,
            },
        ],
        plugins: [
            clear({ targets: ['public/dist'] }),
            replaceEnvVariables(),
            nodeResolve(),
            eslint({
                exclude: ['node_modules/**', './package.json'],
                throwOnWarning: false,
                throwOnError: true,
            }),
        ],
    };
});

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
