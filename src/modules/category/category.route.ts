import { Router } from "express";
import CategoryController from "@modules/category/category.controller";
import RouteInterface from "@core/interfaces/route.interface";

class CategoryRoute implements RouteInterface {
  public path = "/api/category";
  public router = Router();

  // Constructor
  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}/`, CategoryController.getAllCategories); // Lấy tất cả category
    this.router.get(`${this.path}/:name`, CategoryController.getCategoryByName); // Lấy category theo ID
    this.router.post(
      `${this.path}/`,
      CategoryController.createCategory
    ); // Tạo category mới
    this.router.post(
      `${this.path}/insertMany`,
      CategoryController.createManyCategories
    ); // Tạo nhiều category
    this.router.put(`${this.path}/:name`, CategoryController.updateCategory); // Cập nhật category theo ID
    this.router.delete(`${this.path}/:name`, CategoryController.deleteCategory); // Xóa category theo ID
  }
}

export default new CategoryRoute();
