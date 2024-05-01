const { RuleTester } = require('eslint');
const logPrefixRule = require('./enforce-debug-prefix.cjs');
const ruleTester = new RuleTester();
ruleTester.run('no-empty-catch', logPrefixRule, {
    valid: [
        {
            code: 'APP_LOGS && Log("yo");',
        },
        {
            code: 'APP_LOGS && console.log("yo");',
        },
        {
            code: 'APP_LOGS && log("yo");',
        },
    ],
    invalid: [
        {
            code: 'Log("yo");',
            errors: [{ messageId: 'forgotDebugPrefix' }],
        },
        {
            code: 'console.log("yo");',
            errors: [{ messageId: 'forgotDebugPrefix' }],
        },
        {
            code: 'log("yo");',
            errors: [{ messageId: 'forgotDebugPrefix' }],
        },
        {
            code: `
function provideMetrics(onMetricCallback) {
    function wvEventCallback(metric) {
        Log('[Provider]', 'provided metric', metric);
        onMetricCallback(metric);
    }

    onCLS(wvEventCallback, opts);
    onFID(wvEventCallback, opts);
    onLCP(wvEventCallback, opts);
}
`,
            errors: [{ messageId: 'forgotDebugPrefix' }],
        },
    ],
});
