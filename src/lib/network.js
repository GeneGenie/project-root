import { getLogger } from './logger.js';
import { LOGS_ENABLED } from './env.js';

const { log } = getLogger('network');

export function safePost(url, body) {
    LOGS_ENABLED && log('send request to', url);
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url, body);
    } else {
        // todo get back here and disallow ignored promises;
        mayFail(fetch(url, { body, method: 'POST', keepalive: true }));
    }
    LOGS_ENABLED && log('after send');
}

function mayFail(promise) {
    promise.catch((e) => {
        LOGS_ENABLED && log('failed', e);
    });
}
