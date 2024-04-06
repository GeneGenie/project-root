import {onLCP, onFID, onCLS} from 'web-vitals';

const opts = {reportAllChanges: false};

function sendToAnalytics(metric) {
    // Replace with whatever serialization method you prefer.
    // Note: JSON.stringify will likely include more data than you need.
    const body = JSON.stringify(metric);

    // Use `navigator.sendBeacon()` if available, falling back to `fetch()`.
    (navigator.sendBeacon && navigator.sendBeacon(process.env.REPORT_URL, body)) ||
    fetch('/analytics', {body, method: 'POST', keepalive: true});
}
function wvEventCallback(metric){
    console.log(metric)
    sendToAnalytics(metric)
}

onCLS(wvEventCallback, opts);
onFID(wvEventCallback, opts);
onLCP(wvEventCallback, opts);
