import rollupConfigs from './rollup.config.js';
import serve from 'rollup-plugin-serve';
import livereload from 'rollup-plugin-livereload';

export default {
    ...rollupConfigs[1],
    sourcemap: true,
    plugins: [
        ...rollupConfigs[1].plugins,
        livereload(),
        serve({
            port: 3000,
            contentBase: ['public', 'public/dist'],
        }),
    ],
};
