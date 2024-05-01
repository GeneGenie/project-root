export function removeSourcemapUrl() {
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
