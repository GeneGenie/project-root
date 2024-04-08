import rollupConfig from './build.js'
import { visualizer } from "rollup-plugin-visualizer";

export default {
    ...rollupConfig,
    output: {
        ...rollupConfig.output,
        sourcemap: 'inline'
    },
    plugins: [
        ...rollupConfig.plugins,
        visualizer({
            sourcemap:true,
            template: 'treemap',
            filename: 'reports/size.html',
            gzipSize:true
        }),
    ]
}
