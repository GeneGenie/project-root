import rollupConfig from './rollup.config.js'
import terser from "@rollup/plugin-terser";
import { visualizer } from "rollup-plugin-visualizer";

export default {
    ...rollupConfig,
    plugins: [
        ...rollupConfig.plugins,
        terser(),
        visualizer({
            template: 'raw-data',
            filename: 'reports/size.json',
            gzipSize:true
        })
    ]
}
