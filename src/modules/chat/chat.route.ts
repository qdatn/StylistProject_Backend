import { Router } from "express";
import ChatController from "./chat.controller";
import RouteInterface from "@core/interfaces/route.interface";

class ChatRoute implements RouteInterface {
  public path = "/api/chat";
  public router = Router();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/messages`, ChatController.getMessages);
    // this.router.post(`${this.path}/send`, ChatController.sendMessage);
    // this.router.get(`${this.path}/:id`, ChatController.getMessageById);
    // this.router.get(`${this.path}/user/:id`, ChatController.getMessagesByUserId);
    // this.router.delete(`${this.path}/:id`, ChatController.deleteMessage);
  }
}

export default new ChatRoute();
