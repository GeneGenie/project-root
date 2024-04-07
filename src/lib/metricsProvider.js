import {onLCP, onFID, onCLS} from 'web-vitals';

const opts = {reportAllChanges: false};
export function provideMetrics(onMetricCallback){
    function wvEventCallback(metric){
        console.log(metric)
        onMetricCallback(metric)
    }

    onCLS(wvEventCallback, opts);
    onFID(wvEventCallback, opts);
    onLCP(wvEventCallback, opts);
}
