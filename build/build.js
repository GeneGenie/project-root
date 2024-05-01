import rollupConfig from './rollup.config.js';
import terser from '@rollup/plugin-terser';

function removeSourcemapUrl() {
    return {
        name: 'remove-sourcemap-url',
        generateBundle(options, bundle) {
            for (const fileName in bundle) {
                if (fileName.endsWith('.js')) {
                    const chunk = bundle[fileName];
                    chunk.code = chunk.code.replace(
                        /\/\/# sourceMappingURL=.+\n?$/,
                        '',
                    );
                }
            }
        },
    };
}
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
            sourcemap: false,
            plugins: [terser()],
        },
    ],
};
