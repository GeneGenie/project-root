const log = console.log.bind(window.console);
// this starts from capital only to avoid IDE auto fillilng as console.log"
export function Log(...args) {
    // discussion about building in logger
    // discussion about localstorage performance
    // discussuon about ree shaking removal and lazy loading lib itself until required
    // todo   considering possible performance issue -> develop lazy LS poller.
    if (localStorage.libdebug === '1') {
        log(...args)
    }
}

class Logger{
  constructor({log}) {
      this._log = log;
  }

    log(...args) {
        // discussion about building in logger
        // discussion about localstorage performance
        // discussuon about ree shaking removal and lazy loading lib itself until required
        // todo   considering possible performance issue -> develop lazy LS poller.
        if (localStorage.libdebug === '1') {
            log(...args)
        }
    }
}


export function getLogger(){
    return new Logger({
        log
    });
}
// use console.table for logs
