import { getLogger, Log } from 'logger';
const logger = getLogger('test');
const log = Log.bind('[test]');
APP_LOGS && Log(222);
APP_LOGS && logger.log(333);
APP_LOGS && log(444);
