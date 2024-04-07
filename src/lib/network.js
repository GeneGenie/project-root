import { getLogger } from './logger.js'

const  {log} = getLogger('network');


export function safePost(url, body) {
    log( 'send request to', url);
    if (navigator.sendBeacon) {
        navigator.sendBeacon(url, body)
    } else {
        // todo get back here and disallow ignored promises;
        mayFail(fetch(url, { body, method: 'POST', keepalive: true }))
    }
    log( 'after send');
}

function mayFail(promise) {
    promise
        .catch(e => {
            log('failed', e);
        })
}
