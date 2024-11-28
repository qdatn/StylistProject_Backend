import { Router } from "express";
import AttributeController from "./attribute.controller";
import RouteInterface from "@core/interfaces/route.interface";

class AttributeRoute implements RouteInterface {
  public path = "/api/attribute";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(`${this.path}/`, AttributeController.createAttribute);
    this.router.get(`${this.path}/`, AttributeController.getAllAttributes);
    this.router.get(`${this.path}/:key`, AttributeController.getAttributeByKey);
    this.router.put(`${this.path}/:key`, AttributeController.updateAttribute);
    this.router.delete(
      `${this.path}/:key`,
      AttributeController.deleteAttribute
    );
    this.router.put(
      `${this.path}/:key/addValues`,
      AttributeController.addValue
    );
    this.router.put(
      `${this.path}/:key/deleteValues`,
      AttributeController.deleteValue
    );
  }
}

export default new AttributeRoute();
