
export function safePost(url,body){
    console.log('[network]','send request to', url)
    (navigator.sendBeacon && navigator.sendBeacon(url, body)) ||
    fetch(url, {body, method: 'POST', keepalive: true});
}
