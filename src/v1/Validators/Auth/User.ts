import { param, body, ValidationChain } from "express-validator";

export const getUserValidator: ValidationChain[] = [
  param("id").exists().isString(),
];

export const changePasswordValidator: ValidationChain[] = [
  body("oldPassword").isString().withMessage("old password must be a string"),
  body("newPassword").isString().withMessage("new password must be a string"),
  body("newPasswordConfirmation")
    .isString()
    .withMessage("new password confirmation must be a string")
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error(
          "new password confirmation does not match new password"
        );
      }
      return true;
    }),
];

export const updateProfileValidator: ValidationChain[] = [
  body("name").optional().isString().withMessage("old password must be a string"),
  body("age").optional().isNumeric().withMessage("age must be a number"),
  body("gender").optional().isString().withMessage("gender must be a string"),
  body("healthGoal").optional().isArray().withMessage("healthGoal must be an array")
];

export const registerAdminValidator: ValidationChain[] = [
  body("email").notEmpty().isString()
];
export const mintTokenValidator: ValidationChain[] = [
  body("productId").notEmpty().isString()
];