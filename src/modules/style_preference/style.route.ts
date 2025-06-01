import IRoute from "@core/interfaces/route.interface";
import { Router } from "express";
import StylePreferenceController from "@modules/style_preference/style.controller";

class StylePreferenceRoute implements IRoute {
  public path = "/api/style-preferences";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, StylePreferenceController.getAll);
    this.router.get(`${this.path}/:id`, StylePreferenceController.getById);
    this.router.post(`${this.path}/`, StylePreferenceController.create);
    this.router.put(`${this.path}/:id`, StylePreferenceController.update);
    this.router.delete(`${this.path}/:id`, StylePreferenceController.delete);
  }
}

export default new StylePreferenceRoute();
