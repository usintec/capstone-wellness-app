import express, {
    Application,
    urlencoded,
    json,
    Request,
    Response,
    NextFunction,
  } from 'express';
  import compression from 'compression';
  import cors from 'cors';
  import RoutesV1 from './v1/Routes';
  import Logger from './core/Logger';
  import {
    port as EnvPort,
    environment
  } from './config';
  import { NotFoundError, InternalError, ApiError } from './core/ApiError';
  import { createServer } from 'http';
  import { limiter } from './config/rateLimit';
  import { paginationValidator } from './v1/Validators/General';
  import os from 'os';
  import { connectDatabase } from './config/database';
  
  process.on('uncaughtException', e => {
    Logger.error(e);
  });
  
  const app: Application = express();
  export const port = process.env.PORT || EnvPort;
  
  app.set('port', port);
  
  // gzip compression to reduce file size before sending to the web browser. Reduces latency and lag
  app.use(compression());
  app.use(cors());
  // Apply the rate limiting middleware to all requests
  app.use(limiter);
  app.use(urlencoded({ limit: '10mb', extended: false, parameterLimit: 10000 }));
  app.use(json({ limit: '10mb' }));
  
  connectDatabase();
  
  // Index route
  app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({
      environment,
      message: `Welcome to Capstone Wellness App ${os.hostname()}}`,
    });
  });
  
  //middleware for routes
  app.use('/v1', paginationValidator, RoutesV1);
  
  // catch 404 and forward to error handler
  app.use((req, res, next) => next(new NotFoundError()));
  
  //custom error handler for all routes
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof ApiError) {
      ApiError.handle(err, res);
    } else {
      if (environment === 'development') {
        Logger.error(err);
        return res.status(500).send(err.message);
      }
      ApiError.handle(new InternalError(), res);
    }
  });
  
  export const server = createServer(app);
  export default app;
  