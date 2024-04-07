import { safePost } from "./network.js";

function sendToAnalytics(metric) {
    const body = JSON.stringify(metric);
    console.log('[Consumer]', 'consumed metric',metric)
    const url  = process.env.REPORT_URL;
    safePost(url,body);
}

export function consumeMetric(metrics){
    sendToAnalytics(metrics)
}
