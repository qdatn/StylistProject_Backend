import { Router } from "express";
import NotificationController from "./notification.controller";
import RouteInterface from "@core/interfaces/route.interface";

class NotificationRoute implements RouteInterface {
  public path = "/api/notification";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, NotificationController.getAllNotifications);
    // this.router.get(`${this.path}/:id`, NotificationController.getNotificationById);
    this.router.post(`${this.path}/`, NotificationController.createNotification);
    this.router.put(`${this.path}/:id`, NotificationController.updateNotification);
    this.router.delete(`${this.path}/:id`, NotificationController.deleteNotification);
  }
}

export default new NotificationRoute();