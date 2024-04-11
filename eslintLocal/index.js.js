const plugin = {
    rules: {
        'enforce-debug-prefix': require('./rules/enforce-debug-prefix.cjs'),
    },
};
module.exports = plugin;
