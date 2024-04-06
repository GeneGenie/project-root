import serve from 'rollup-plugin-serve'
import nodeResolve from "@rollup/plugin-node-resolve";
import dotenv from "rollup-plugin-dotenv";


export default {
    input: 'src/index.js',
    output: {
        file: 'public/dist/bundle.js',
        format: 'iife'
    },
    plugins: [
        nodeResolve(),
        dotenv(),

        serve({
            port: 3000,
            contentBase: ['public', 'public/dist'],
        })
    ]
}
