// this starts from capital only to avoid IDE auto fillilng as console.log
function logAllowed() {
    return localStorage.libdebug === '1';
}
export const Log = console.log.bind(console);
export function getLogger(name) {
    // now much better
    // look at this minified code, it doesmnt get shaked away;
    // and this also doesn't help,
    return {
        log: logAllowed() ? console.log.bind(console, `[${name}]`) : () => {},
        // todo get here later++++
        // log: console.log.bind(console, `[${name}]`) // this is working but without localstorage ofcourse
    };
}

// use console.table for logs
