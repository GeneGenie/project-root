// this starts from capital only to avoid IDE auto fillilng as console.log"
export function Log (...args) {
    // discussion about building in logger
    // discussion about localstorage performance
    // discussuon about ree shaking removal and lazy loading lib itself until required
    // todo   considering possible performance issue -> develop lazy LS poller.
    if (localStorage.libdebug === '1') {
        console.log(...args)
        // we could utilize trace here.
    }
}

export function getLogger (name) {
    // now much better
    return {
        log: (...args) => Log(`[${name}]`, ...args)
        // todo get here later
        // log: console.log.bind(console, `[${name}]`) // this is working but without localstorage ofcourse
    }
}

// use console.table for logs
