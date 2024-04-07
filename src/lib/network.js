export function safePost(url, body) {
    console.log('[network]', 'send request to', url);
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url, body)
    } else {
        fetch(url, { body, method: 'POST', keepalive: true });
    }
}
