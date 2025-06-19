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
    this.router.post(
      `${this.path}/momo/refund`,
      PaymentController.refundPayment
    );
    this.router.post(
      `${this.path}/momo/refund/status`,
      PaymentController.queryRefundStatus
    );
    this.router.post(`${this.path}/momo`, PaymentController.createPayment);
    this.router.post(
      `${this.path}/vnpay`,
      PaymentController.createVnpayPayment
    );
  }
}

export default new PaymentRoute();
