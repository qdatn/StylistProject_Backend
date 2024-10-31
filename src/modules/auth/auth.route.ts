import { Router } from "express";
import AuthController from "@modules/auth/auth.controller";
import RouteInterface from "@core/interfaces/route.interface";
import authMiddleware from "@core/middlewares/auth.middleware";
import { Request, Response } from "express";
import IAuth from "./auth.interface";

class AuthRoute implements RouteInterface {
  public path = "/api/v1/auth";
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
      `${this.path}/update/:id`,
      authMiddleware,
      AuthController.updateUser
    );
    this.router.delete(
      `${this.path}/delete/:id`,
      authMiddleware,
      AuthController.deleteUser
    );
  }
}

export default new AuthRoute();
