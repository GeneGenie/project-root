import nodeResolve from "@rollup/plugin-node-resolve";
import dotenv from "rollup-plugin-dotenv";
import clear from 'rollup-plugin-clear'
import packageJSON from './package.json' assert {type: "json"};

console.log(packageJSON)
export default {
    input: 'src/index.js',
    output: {
        file: `public/dist/${packageJSON.name}.js`,
        format: 'iife'
    },
    plugins: [
        clear({targets:['public/dist']}),
        nodeResolve(),
        dotenv(),
    ]
}
