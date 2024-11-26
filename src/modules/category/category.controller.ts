// controllers/categoryController.js
import { pagination } from "@core/middlewares";
import CategoryService from "@modules/category/category.service";
import { Request, Response, NextFunction } from "express";

class CategoryController {
  async getAllCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = await CategoryService.getAllCategories();
      await pagination(req, res, categories, next);
      res.status(200).json(res.locals.pagination);
    } catch (error: any) {
      next(error);
    }
  }

  async getCategoryById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const category = await CategoryService.getCategoryById(req.params.id);
      if (!category) {
        res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error: any) {
      next(error);
    }
  }

  async createCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error: any) {
      next(error);
    }
  }

  async createManyCategories(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const categories = req.body; // Dữ liệu sản phẩm gửi từ client
      const newCategories = await CategoryService.createManyCategories(
        categories
      );
      res.status(201).json({
        message: "Categories added successfully",
        data: newCategories,
      });
    } catch (error: any) {
      next(error);
    }
  }

  async updateCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const updatedCategory = await CategoryService.updateCategory(
        req.params.id,
        req.body
      );
      if (!updatedCategory) {
        res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(updatedCategory);
    } catch (error: any) {
      next(error);
    }
  }

  async deleteCategory(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const deletedCategory = await CategoryService.deleteCategory(
        req.params.id
      );
      if (!deletedCategory) {
        res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Category deleted" });
    } catch (error: any) {
      next(error);
    }
  }
}

export default new CategoryController();
