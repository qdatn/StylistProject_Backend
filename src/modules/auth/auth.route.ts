import { Router } from "express";
import AuthController from "@modules/auth/auth.controller";
import RouteInterface from "@core/interfaces/route.interface";

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
    this.router.put(`${this.path}/update/:id`, AuthController.updateUser);
    this.router.delete(`${this.path}/delete/:id`, AuthController.deleteUser);
  }
}

export default new AuthRoute();
