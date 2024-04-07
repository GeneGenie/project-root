function sendToAnalytics(metric) {
    const body = JSON.stringify(metric);

    const url  = process.env.REPORT_URL;
    (navigator.sendBeacon && navigator.sendBeacon(url, body)) ||
    fetch(url, {body, method: 'POST', keepalive: true});
}

export function consumeMetric(metrics){
    sendToAnalytics(metrics)
}
