import User from "@modules/auth/user.model";
import UserRepository from "@modules/auth/auth.repository";
import UserService from "@modules/auth/auth.service";
import AuthController from "@modules/auth/auth.controller";
import AuthRoute from "@modules/auth/auth.route";
import IAuth from "@modules/auth/auth.interface";
import AuthDto from "./dtos/auth.dto";
import OTP from "./otp.model";

export {
  User,
  OTP,
  UserRepository,
  UserService,
  AuthController,
  AuthRoute,
  IAuth,
  AuthDto,
};
