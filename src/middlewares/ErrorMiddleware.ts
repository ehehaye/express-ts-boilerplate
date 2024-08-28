/* eslint-disable @typescript-eslint/no-explicit-any */
import { inspect } from 'util';
import { Middleware, ExpressErrorMiddlewareInterface } from 'routing-controllers';
import { Request, Response, NextFunction } from 'express';
import { Service } from 'typedi';
import { errorLogger } from '@/utils/log4js';

@Service()
@Middleware({ type: 'after' })
export class ErrorMiddleware implements ExpressErrorMiddlewareInterface {
  error(error: any, req: Request, res: Response, next: NextFunction) {
    // https://github.com/typestack/routing-controllers/issues/630
    // https://github.com/typestack/routing-controllers/issues/288
    if (res.headersSent) return;

    errorLogger.error(inspect(error, { showHidden: false, depth: null }));

    res.status(error.httpCode || 500).json({
      message: error.message || 'Internal error',
      errors: error.errors,
    });

    next(error);
  }
}
