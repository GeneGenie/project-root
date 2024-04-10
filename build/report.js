import rollupConfig from './build.js';
import { visualizer } from 'rollup-plugin-visualizer';
import { bundleSize } from './plugins/bundleSize.js';

export default {
    ...rollupConfig,
    plugins: [
        ...rollupConfig.plugins,
        bundleSize(),
        visualizer({
            sourcemap: true,
            template: 'treemap',
            filename: 'reports/size.html',
            gzipSize: true
        })
    ]
};
