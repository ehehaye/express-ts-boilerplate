import * as log4js from 'log4js';
import { type DateFileAppender } from 'log4js';

const level = process.env.NODE_ENV === 'development' ? 'debug' : 'info';

const commonConfig: Omit<DateFileAppender, 'filename'> = {
  type: 'dateFile',
  pattern: 'yyyy-MM-dd.log',
  alwaysIncludePattern: true,
  compress: false,
  keepFileExt: true,
};

log4js.configure({
  appenders: {
    http: {
      ...commonConfig,
      filename: 'logs/http/http',
    },
    error: {
      ...commonConfig,
      filename: 'logs/error/error',
    },
    stdout: { type: 'stdout' },
  },
  categories: {
    default: { appenders: ['stdout'], level },
    http: { appenders: ['http', 'stdout'], level },
    error: { appenders: ['error'], level },
  },
});

export const logger = log4js.getLogger('default');
export const httpLogger = log4js.getLogger('http');
export const errorLogger = log4js.getLogger('error');
