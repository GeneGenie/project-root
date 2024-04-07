import {Log} from './logger.js'
const log = (...args)=> console.log('[network]',...args)
// as you know, there is SOME flexibility in this

export function safePost(url, body) {
    log('[network]', 'send request to', url);
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url, body)
    } else {
        // todo get back here and disallow ignored promises;
        mayFail(fetch(url, { body, method: 'POST', keepalive: true }))
    }
    log('[network]', 'after send');
}

function mayFail(promise) {
    promise
        .catch(e => {
            log('[network]', 'failed', e);
        })
}
