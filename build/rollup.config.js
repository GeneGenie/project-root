import nodeResolve from '@rollup/plugin-node-resolve';
import dotenv from 'rollup-plugin-dotenv';
import clear from 'rollup-plugin-clear';
// eslint-disable-next-line
import packageJSON from '../package.json' assert { type: 'json' };
import eslint from '@rollup/plugin-eslint';

export default {
    input: 'src/index.js',
    output: {
        file: `public/dist/${packageJSON.name}.js`,
        format: 'iife',
        sourcemap: 'file'
    },
    plugins: [
        clear({ targets: ['public/dist'] }),
        eslint({
            exclude: ['node_modules/**', './package.json'],
            throwOnWarning: false,
            throwOnError: true
        }),
        nodeResolve(),
        dotenv(),
    ]
};
