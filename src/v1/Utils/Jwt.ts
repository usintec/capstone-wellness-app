import jwt from 'jsonwebtoken';
import User from '../Interface/User';
import Logger from '../../core/Logger';
import { BadTokenError } from '../../core/ApiError';
import { JWT_SECRET } from '../../config';

export const createToken = (user: User): string => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    });
};

export const verifyToken = async (
    token: string
) => {
    try {
        let userId;
        jwt.verify(token, JWT_SECRET, (err, decoded: any) => {
          if(err){
            Logger.error(err);
            throw new BadTokenError();
          }
          if(decoded)
            userId = decoded.id;
        });
        return userId;
      } catch (err) {
        Logger.error(err);
        throw new BadTokenError();
      }
};

export default { createToken, verifyToken };
