import nodeResolve from '@rollup/plugin-node-resolve';
import dotenv from 'dotenv';
import clear from 'rollup-plugin-clear';
import eslint from '@rollup/plugin-eslint';
import fs from 'fs';
import replace from '@rollup/plugin-replace';

dotenv.config({ path: ['.env.local', '.env.production'] });
const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

function getEnv() {
    return Object.keys(process.env).reduce((acc, key) => {
        if (key.startsWith('APP_')) {
            acc[key] = process.env[key];
        }
        return acc;
    }, {});
}

export default {
    input: 'src/index.js',
    output: [
        {
            file: `public/dist/${packageJSON.name}.js`,
            format: 'iife',
            sourcemap: 'file',
        },
    ],
    plugins: [
        clear({ targets: ['public/dist'] }),
        nodeResolve(),
        eslint({
            exclude: ['node_modules/**', './package.json'],
            throwOnWarning: false,
            throwOnError: true,
        }),
        replace(getEnv()),
    ],
};
