import { BadRequestDataError } from '../../core/ApiError';
import { Request, Response, NextFunction } from 'express';
import { validationResult } from 'express-validator';

type AsyncFunction = (req: Request, res: Response, next: NextFunction) => Promise<unknown>;

// use default for middleware
export default (execution: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction): void => {
    execution(req, res, next).catch(next);
  };

// this one should be self explanatory
export const asyncController = (execution: AsyncFunction) =>
  (req: Request, res: Response, next: NextFunction): void => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) throw new BadRequestDataError('Validation Failed', errors);

    execution(req, res, next).catch(next);
  };
