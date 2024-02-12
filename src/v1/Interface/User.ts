import { Document } from 'mongoose';
import { Roles, UserStatus } from '../Type/General';

export default interface UserDocument extends Document {
    email: string;
    name: string;
    password: string;
    role: Roles;
    resetPasswordToken: string;
    resetPasswordExpire: Date;
    confirmEmail: boolean;
    confirmEmailToken: string;
    profilePictureUrl: string;
    status: UserStatus;
    isValidPassword(password: string): Promise<Error | boolean>;
    getResetPasswordToken(): string;
    generateEmailConfirmToken(): string;
    gender: string,
    age: number

}
