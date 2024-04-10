import rollupConfig from './build.js'
import { visualizer } from "rollup-plugin-visualizer";
import path from "path";
import fs from "fs";
import prettyBytes from 'pretty-bytes';
import { gzipSizeSync } from 'gzip-size';



const format = size => prettyBytes(size);
export default {
    ...rollupConfig,
    plugins: [
        ...rollupConfig.plugins,
        {
            name: 'bundle-size',
            generateBundle(options, bundle) {
                const asset = path.basename(options.file);
                const code = bundle[asset].code;
                const gzipped = gzipSizeSync(code)

                fs.writeFileSync('reports/size.json', JSON.stringify({
                    [asset]: {
                        size: code.length,
                        gzipped
                    }
                }))
            }
        },
        visualizer({
            sourcemap: true,
            template: 'treemap',
            filename: 'reports/size.html',
            gzipSize: true
        }),
    ]
}
