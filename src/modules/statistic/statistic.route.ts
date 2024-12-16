import { Router } from "express";
import RouteInterface from "@core/interfaces/route.interface";
import StatisticController from "./statistic.controller";

class StatisticRoute implements RouteInterface {
  public path = "/api/statistic";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}/`,
      StatisticController.getProAndOrderStatistics
    );
    this.router.get(
      `${this.path}/revenue`,
      StatisticController.getRevenueByDate
    );
    this.router.get(`${this.path}/order`, StatisticController.fetchOrdersByDateRange);
  }
}

export default new StatisticRoute();
