import {Log} from './logger.js'


const log = (...args)=> {
    // so trace kinda works but i am consirened about DX and browser performance so lets do a trade
    if(true){
        console.log('[network]',...args)
    }else{
        console.trace('[network]',...args)
    }


}
// as you know, there is SOME flexibility in this

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
