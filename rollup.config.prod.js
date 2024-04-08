import rollupConfig from './rollup.config.js'
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

export default {
    ...rollupConfig,
    plugins: [
        ...rollupConfig.plugins,
        terser(),
        visualizer({
            sourcemap:true,
            template: 'treemap',
            filename: 'reports/size.html',
            gzipSize:true
        })
    ]
}
