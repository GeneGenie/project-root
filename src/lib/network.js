import { getLogger } from './logger.js';

const { log } = getLogger('network');

export function safePost(url, body) {
    LOGS && log('send request to', url);
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url, body);
    } else {
        // todo get back here and disallow ignored promises;
        mayFail(fetch(url, { body, method: 'POST', keepalive: true }));
    }
    LOGS && console.log('after send');
}

function mayFail(promise) {
    promise.catch((e) => {
        LOGS && log('failed', e);
    });
}
