import serve from 'rollup-plugin-serve'


export default {
    input: 'src/index.js',
    output: {
        file: 'public/dist/bundle.js',
        format: 'iife'
    },
    plugins: [
        serve({
            port: 3000,
            contentBase: ['public', 'public/dist'],
        })
    ]
}
