import rollupConfigs from './rollup.config.js';
import terser from '@rollup/plugin-terser';
// import { removeSourcemapUrl } from './plugins/removeSourceMapUrl.js';

export default rollupConfigs.map((rollupConfig) => {
    return {
        ...rollupConfig,
        output: [
            ...rollupConfig.output,
            {
                ...rollupConfig.output[0],
                file: rollupConfig.output[0].file.replace('.js', '.min.js'),
                plugins: [terser()],
            },
        ],
    };
});
