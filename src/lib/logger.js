// this starts from capital only to avoid IDE auto fillilng as console.log"
export function Log(...args) {
    // discussion about building in logger
    // discussion about localstorage performance
    // discussuon about ree shaking removal and lazy loading lib itself until required
    // todo   considering possible performance issue -> develop lazy LS poller.
    if (localStorage.libdebug === '1') {
        console.log(...args)
    }
}

export class Logger {
    constructor(name) {
        // this._log = log;
        this._name = name;
    }

    log(...args) {
        // discussion about building in logger
        // discussion about localstorage performance
        // discussuon about ree shaking removal and lazy loading lib itself until required
        // todo   considering possible performance issue -> develop lazy LS poller.
        if (localStorage.libdebug === '1') {
            console.log(this._name, ...args)
        }
    }
}


export function getLogger() {
    return new Logger({
        log
    });
}

// use console.table for logs
