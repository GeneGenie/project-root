export function Log(...args) {
    if (localStorage.libdebug === '1') {
        console.log(...args)
    }
}

// use console.table for logs
