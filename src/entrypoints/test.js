import { getLogger, Log } from '../lib/logger.js';
const logger = getLogger('test');
const log = Log.bind('[test]');
APP_LOGS && Log(222);
APP_LOGS && logger.log(333);
// eslint-disable-next-line
LOG: APP_LOGS && log(444);
