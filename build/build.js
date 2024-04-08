import rollupConfig from './rollup.config.js'
import terser from "@rollup/plugin-terser";

function removeSourcemapUrl() {
    return {
        name: 'remove-sourcemap-url',
        generateBundle(options, bundle) {
            for (const fileName in bundle) {
                if (fileName.endsWith('.js')) {
                    const chunk = bundle[fileName];
                    chunk.code = chunk.code.replace(/\/\/# sourceMappingURL=.+\n?$/, '');
                }
            }
        }
    };
}
export default {
    ...rollupConfig,
    plugins: [
        ...rollupConfig.plugins,
        terser(),
        removeSourcemapUrl()
    ]
}
