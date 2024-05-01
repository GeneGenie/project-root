import nodeResolve from '@rollup/plugin-node-resolve';
import dotenv from 'rollup-plugin-dotenv';
import clear from 'rollup-plugin-clear';
import eslint from '@rollup/plugin-eslint';
import fs from 'fs';

const packageJSON = JSON.parse(fs.readFileSync('./package.json', 'utf8'));

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
        dotenv(),
    ],
};
