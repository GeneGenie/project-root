import rollupConfig from './rollup.config.js';
import terser from '@rollup/plugin-terser';
import { removeSourcemapUrl } from './plugins/removeSourceMapUrl.js';

export default {
    ...rollupConfig,
    output: [
        ...rollupConfig.output,
        {
            file: rollupConfig.output[0].file.replace('.js', '.min.js'),
            format: 'iife',
            sourcemap: 'file',
            plugins: [terser()],
        },
        {
            file: rollupConfig.output[0].file.replace('.js', '.ns.min.js'),
            format: 'iife',
            sourcemap: 'file',
            plugins: [terser(), removeSourcemapUrl()],
        },
    ],
};
