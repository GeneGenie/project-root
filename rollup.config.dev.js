import rollupConfig from './rollup.config.js'
import serve from "rollup-plugin-serve";
import livereload from 'rollup-plugin-livereload'

export default {
    ...rollupConfig,
    plugins: [
        ...rollupConfig.plugins,
        livereload(),
        serve({
            port: 3000,
            contentBase: ['public', 'public/dist'],
        })
    ]
}
