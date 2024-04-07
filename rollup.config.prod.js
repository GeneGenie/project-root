import rollupConfig from './rollup.config.js'
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

export default {
    ...rollupConfig,
    plugins: [
        ...rollupConfig.plugins,
        terser(),
        visualizer({
            open:true,
            template: 'treemap',
            filename: 'public/dist/stats.html',
            gzipSize:true
        })
    ]
}
