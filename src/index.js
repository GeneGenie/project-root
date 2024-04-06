import {onLCP, onFID, onCLS} from 'web-vitals';

const opts = {reportAllChanges: false};

function sendToAnalytics(metric) {
    const body = JSON.stringify(metric);

    const url  = process.env.REPORT_URL;
    (navigator.sendBeacon && navigator.sendBeacon(url, body)) ||
    fetch(url, {body, method: 'POST', keepalive: true});
}
function wvEventCallback(metric){
    console.log(metric)
    sendToAnalytics(metric)
}

onCLS(wvEventCallback, opts);
onFID(wvEventCallback, opts);
onLCP(wvEventCallback, opts);
