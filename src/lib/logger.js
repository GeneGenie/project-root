// this starts from capital only to avoid IDE auto fillilng as console.log

export function Log(...args) {
    // after tree shaking, all logs get removed from prod build
    if (LOGS) {
        // discussion about building in logger
        // discussion about localstorage performance
        // discussuon about ree shaking removal and lazy loading lib itself until required
        // todo   considering possible performance issue -> develop lazy LS poller.
        // https://codesandbox.io/p/sandbox/localstoragevcookies-6w39h?file=%2Fsrc%2Ftest.ts%3A71%2C1
        if (localStorage.libdebug === '1') {
            LOGS && console.log(...args);
            // we could utilize trace here.
        }
    }
}

export function getLogger(name) {
    // now much better
    // look at this minified code, it doesmnt get shaked away;
    // and this also doesn't help,
    return {
        log(...args) {
            process.env.LOGS && Log(`[${name}]`, ...args);
        },
        // todo get here later
        // log: console.log.bind(console, `[${name}]`) // this is working but without localstorage ofcourse
    };
}

// use console.table for logs
