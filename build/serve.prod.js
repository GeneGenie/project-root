import rollupConfig from './build.js'
import serve from "rollup-plugin-serve";

export default {
    ...rollupConfig,
    plugins: [
        ...rollupConfig.plugins,
        serve({
            port: 3000,
            contentBase: ['public', 'public/dist'],
        })
    ]
}
