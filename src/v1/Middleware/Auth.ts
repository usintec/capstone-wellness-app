import { Request, Response, NextFunction } from "express";
import Jwt from "../Utils/Jwt";
import UserService from '../Services/User'
import asyncHandler from '../Utils/AsyncHandler'
import { AuthFailureError } from "../../core/ApiError";
import { UserStatus } from "../Type/General";

  export const authenticate = asyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      const { authorization } = req.headers;
  
      if (!authorization) return next(new AuthFailureError('No Token Provided!'));
  
      if (!authorization.startsWith('Bearer ')) {
        return next(new AuthFailureError('Invalid Authorization'));
      }
  
      const split = authorization && authorization.split(' '); //-> Authorization: Bearer
  
      if (!split || split.length !== 2) {
        return next(new AuthFailureError('Invalid Token'));
      }
  
      const token = split[1];
      const verifiedToken = await Jwt.verifyToken(token);
      if(!verifiedToken)
        return next(new AuthFailureError('Invalid Token!'));
        const user = await UserService.getUserById(verifiedToken);
        if(user){
      if (user.status === UserStatus.BANNED) {
        return next(
          new AuthFailureError(
            `Your account is ${UserStatus.BANNED}, contact to support`
          )
        );
      }
      req.user = user;
    }
      return next();
    }
  );
  