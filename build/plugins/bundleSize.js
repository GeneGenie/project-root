import path from 'path';
import { gzipSizeSync } from 'gzip-size';
import fs from 'fs';

export function bundleSize () {
    return {
        name: 'bundle-size',
        generateBundle (options, bundle) {
            const asset = path.basename(options.file);
            const code = bundle[asset].code;
            const gzipped = gzipSizeSync(code);

            fs.writeFileSync('reports/size.json', JSON.stringify({
                [asset]: {
                    size: code.length,
                    gzipped
                }
            }));
        }
    };
}
