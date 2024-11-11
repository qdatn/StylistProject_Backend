import { Router } from "express";
import AuthController from "@modules/auth/auth.controller";
import RouteInterface from "@core/interfaces/route.interface";
import authMiddleware from "@core/middlewares/auth.middleware";
import { Request, Response } from "express";
import IAuth from "./auth.interface";

class AuthRoute implements RouteInterface {
  public path = "/api/auth";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/register`, AuthController.register);
    this.router.post(`${this.path}/login`, AuthController.login);
    this.router.post(`${this.path}/logout`, AuthController.logout);
    this.router.put(
      `${this.path}/:id`,
      authMiddleware,
      AuthController.updateUser
    );
    this.router.delete(
      `${this.path}/:id`,
      authMiddleware,
      AuthController.deleteUser
    );
    this.router.get(
      `${this.path}/send-verification/:email`,
      AuthController.sendVerification
    );
    this.router.get(`${this.path}/verify`, AuthController.verifyOTP);
  }
}

export default new AuthRoute();
