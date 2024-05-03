import { safePost } from './network.js';
import { Log } from './logger.js';

function sendToAnalytics(metric) {
    const body = JSON.stringify(metric);
    Log('[Consumer]', 'consumed metric', metric);
    const url = APP_REPORT_URL;
    safePost(url, body);
}

export function consumeMetric(metrics) {
    sendToAnalytics(metrics);
}
