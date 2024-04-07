import {onLCP, onFID, onCLS} from 'web-vitals';
import { Log } from "./logger.js";

const opts = {reportAllChanges: false};
export function provideMetrics(onMetricCallback){
    function wvEventCallback(metric){
        Log('[Provider]', 'provided metric',metric)
        onMetricCallback(metric)
    }

    onCLS(wvEventCallback, opts);
    onFID(wvEventCallback, opts);
    onLCP(wvEventCallback, opts);
}
