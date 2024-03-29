import { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import Encryption from "../Utils/Encryption";
import UserDocument from "../Interface/User";
import { Gender, Roles, UserStatus } from "../Type/General";
import generator from "generate-password";
import { BrevoService, EmailOptions } from "../Services/Brevo";
import { TOKEN_CONFIRMATION } from "../../config/emailTemplates";

const UserSchema = new Schema(
  {
    name: {
      type: String,
      default: ""
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
    },
    birthday: {
      type: String,
    },
    gender: {
      type: String,
      enum: [Gender.MALE, Gender.FEMALE],
    },
    dateOfBirth: {
      type: String
    },
    age: {
      type: Number,
      default: 0
    },
    healthGoal: [
      {
      type: String
      }
  ],
    role: {
      type: String,
      required: true,
      enum: [Roles.USER, Roles.ADMIN, Roles.SUPER_ADMIN],
      default: Roles.USER,
    },
    profilePictureUrl:{
        type: String
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    status: {
      type: String,
      default: UserStatus.ACTIVE,
      enum: [UserStatus.ACTIVE, UserStatus.INACTIVE, UserStatus.BANNED],
    },
    confirmEmailToken: String,
    resetPasswordToken: String,
    resetPasswordExpire: Date,
  },
  { timestamps: true }
);

UserSchema.pre<UserDocument>("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(this.password, 10);
  this.password = hash;
  next();
});

UserSchema.methods.isValidPassword = async function (
  password: string
): Promise<Error | boolean> {
  return await bcrypt.compare(password, this.password);
};

UserSchema.methods.getResetPasswordToken = async function () {
  const token = Math.floor(1000 + Math.random() * 9000);
  this.resetPasswordToken = await Encryption.hash(token.toString());
  //set expire
  this.resetPasswordExpire = Encryption.minutesExp(new Date(), 10);
  return token;
};

// Generate email confirm token
UserSchema.methods.generateEmailConfirmToken = async function () {
  const brevoService = new BrevoService();
  // email confirmation token
  const token = Math.floor(1000 + Math.random() * 9000);
  const emailOptions = {
    email: this.email,
    subject: "Confirmation Token",
    templateId: TOKEN_CONFIRMATION,
    params: {
      name: this.name,
      token: token,
    }
  } as EmailOptions
  brevoService.sendEmail(emailOptions)
  return token;
};

export default model<UserDocument>("User", UserSchema);
