import rollupConfig from './rollup.config.js'
import terser from "@rollup/plugin-terser";
import serve from "rollup-plugin-serve";

export default {
    ...rollupConfig,
    plugins: [
        ...rollupConfig.plugins,
        terser(),
        serve({
            port: 3000,
            contentBase: ['public', 'public/dist'],
        })
    ]
}
