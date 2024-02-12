import { body, ValidationChain } from "express-validator";

export const registerValidator: ValidationChain[] = [
  body("email").isString().isEmail(),
  body("password").isString().isLength({ min: 6 }),
];

export const loginValidator: ValidationChain[] = [
  body("email").isString().toLowerCase().isEmail(),
  body("password").isString(),
  body("rememberMe")
    .optional()
    .isBoolean()
    .withMessage("The remember me field must be a boolean"),

];

export const forgotPasswordValidator: ValidationChain[] = [
  body("email").isString(),
];

export const emailWhiteListValidator: ValidationChain[] = [
  body("email").isEmail().withMessage('Invalid email format'),
];

export const confirmEmailValidator: ValidationChain[] = [
  body("token").notEmpty().isString(),
  body("email").notEmpty().isString()
];

export const resetPasswordValidator: ValidationChain[] = [
  body("email").isString(),
  body("token").isString(),
  body("password").isString(),
];

export const accessTokenValidator: ValidationChain[] = [
  body("code").isString(),
];
