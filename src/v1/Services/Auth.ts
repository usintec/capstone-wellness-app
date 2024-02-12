import { AuthFailureError, NotFoundError } from '../../core/ApiError';
import UserModel from '../Models/User'
import Jwt from '../Utils/Jwt'
import { Roles, UserStatus } from '../Type/General';
import generator from "generate-password";
import { BrevoService, EmailOptions } from './Brevo';
import { EMAIL_TOKEN_ACTIVATION, PASSWORD_ACTIVATION } from '../../config/emailTemplates';

//Register a new user
const register = async (
    email: string,
    password: string,
    role: string
): Promise<any> => {
    try {
      const brevoService = new BrevoService();
        let pass = password
        if(role == Roles.ADMIN){
          pass = `${generatedCode}`;
        } 
        const user = await UserModel.create({
            email,
            password,
            role
        });
        const emailToken = await user.generateEmailConfirmToken()
        if(role != Roles.ADMIN){
          user.confirmEmailToken = emailToken
        }
        await user.save()
        if(role == Roles.ADMIN){
          const emailOptions = {
            email: user.email,
            subject: 'Account Activation',
            params:{
              password:pass
            },
            templateId: PASSWORD_ACTIVATION
          } as EmailOptions
          brevoService.sendEmail(emailOptions)
        } else {
          const emailOptions = {
            email: user.email,
            subject: 'Account Activation',
            params:{
              password:emailToken
            },
            templateId: EMAIL_TOKEN_ACTIVATION
          } as EmailOptions
          brevoService.sendEmail(emailOptions)
        }
        return { user };
    } catch (error: any) {
        throw new Error(error.message);
    }
}

//Attempt to login a user
const login = async (
    email: string,
    password: string
  ): Promise<any> => {
    const user = await UserModel.findOne({ email }).select(
      "+password"
    );
    if (!user) {
      throw new AuthFailureError("Invalid credentials. User not found");
    }

    const isValidPassword = await user.isValidPassword(password);
    if (!isValidPassword) {
      throw new AuthFailureError("Invalid credentials");
    }

    if (user.status != UserStatus.ACTIVE) {
      throw new AuthFailureError("Account has been deactivated");
    }

    // if (!user.confirmEmail) {
    //   throw new AuthFailureError("Account has not been verified");
    // }

    const accessToken = await Jwt.createToken(user);

    const transformedUser = user.toObject({
      // eslint-disable-next-line no-unused-vars
      transform: (doc, ret, options) => {
        if (ret.password) delete ret.password;
        if (ret.activated) delete ret.activated;
        if (ret.confirmEmail) delete ret.confirmEmail;
        if (ret.confirmEmailToken) delete ret.confirmEmailToken;
        return ret;
      },
    });

    return {
      accessToken,
      user: transformedUser,
    };
  }

const confirmEmail = async (account: {email: string, token: string}): Promise<any> => {
    const user = await UserModel.findOne({
        confirmEmailToken: account.token,
        email: account.email
    });

    if (!user) {
        throw new NotFoundError("Invalid email confirmation token");
    }
    user.confirmEmailToken = '';
    user.confirmEmail = true;
    await user.save();
}

const generatedCode = generator.generate({
  length: 10,
  numbers: true,
  uppercase: true,
  lowercase: true,
  symbols: false,
});

export default { register, login, confirmEmail }