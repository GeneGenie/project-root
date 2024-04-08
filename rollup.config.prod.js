import rollupConfig from './rollup.config.js'
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";
import serve from "rollup-plugin-serve";

export default {
    ...rollupConfig,
    output: {
        ...rollupConfig.output,
        sourcemap: 'inline'
    },
    plugins: [
        ...rollupConfig.plugins,
        terser(),
        visualizer({
            sourcemap:true,
            template: 'treemap',
            filename: 'reports/size.html',
            gzipSize:true
        }),
        serve({
            port: 3000,
            contentBase: ['public', 'public/dist'],
        })
    ]
}
