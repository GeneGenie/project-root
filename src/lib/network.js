export function safePost(url, body) {
    console.log('[network]', 'send request to', url);
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url, body)
    } else {
        // todo get back here and disallow ignored promises;
        mayFail(fetch(url, { body, method: 'POST', keepalive: true }))
    }
}

function mayFail(promise) {
    promise
        .catch(e => {
            console.warn('[network]', 'failed', e);
        })
}
