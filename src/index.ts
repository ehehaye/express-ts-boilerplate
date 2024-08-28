import './env';
import 'reflect-metadata';
import { useContainer, useExpressServer } from 'routing-controllers';
import { Container } from 'typedi';
import * as express from 'express';
import * as pkg from 'express/package.json';
import * as os from 'os';
import * as cors from 'cors';
import * as compression from 'compression';
import * as morgan from 'morgan';
import helmet from 'helmet';
import { rateLimit } from 'express-rate-limit';
import { ErrorMiddleware } from '@/middlewares/ErrorMiddleware';
import { httpLogger } from '@/utils/log4js';
import { getNetworkAddresses } from '@/utils/net';

function main() {
  useContainer(Container);

  const app = express();

  app
    .use(rateLimit())
    .use(cors())
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(compression())
    .use(helmet())
    .use(
      morgan('tiny', {
        stream: {
          write: message => httpLogger.info(message.trim()),
        },
      }),
    );

  useExpressServer(app, {
    controllers: [__dirname + '/controllers/*.js'],
    middlewares: [ErrorMiddleware],
    interceptors: [],
    defaultErrorHandler: false,
    classTransformer: true,
  });

  const port = +(process.env.PORT || 9000);

  app.listen(port, '0.0.0.0', () => {
    console.info(
      os.EOL +
        `Express@${pkg.version} based on NodeJS@${process.version} is running at ${os.EOL}` +
        ` ➡️ Local: http://localhost:${port}${os.EOL}` +
        getNetworkAddresses()
          .map(addr => ` ➡️ Network: http://${addr}:${port}`)
          .join(os.EOL),
    );
  });
}

main();
