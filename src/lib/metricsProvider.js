import { Log } from './logger.js';

const noop = function (cb) {
    cb({ x: 1 });
};
const onLCP = noop;
const onFID = noop;
const onCLS = noop;
const opts = { reportAllChanges: false };

export function provideMetrics(onMetricCallback) {
    function wvEventCallback(metric) {
        process.env.LOGS && Log('[Provider]', 'provided metric', metric);
        onMetricCallback(metric);
    }

    onCLS(wvEventCallback, opts);
    onFID(wvEventCallback, opts);
    onLCP(wvEventCallback, opts);
}
