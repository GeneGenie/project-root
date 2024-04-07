export function Log(...args) {
    // discussion about building in logger
    // discussion about localstorage performance
    // discussuon about ree shaking removal and lazy loading lib itself until required
    // todo   considering possible performance issue -> develop lazy LS poller.
    if (localStorage.libdebug === '1') {
        console.log(...args)
    }
}

// use console.table for logs
