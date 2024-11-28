import { Router } from "express";
import RouteInterface from "@core/interfaces/route.interface";
import PaymentController from "./payment.controller";

class PaymentRoute implements RouteInterface {
  public path = "/api/payment";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/momo`, PaymentController.createPayment);
  }
}

export default new PaymentRoute();
