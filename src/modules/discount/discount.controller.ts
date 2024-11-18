import { Request, Response, NextFunction } from "express";
import DiscountService from "./discount.service";
import { pagination } from "@core/middlewares";

class DiscountController {
  async createDiscount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const discount = await DiscountService.createDiscount(req.body);
      res.status(201).json(discount);
    } catch (error) {
      next(error);
    }
  }

  async getDiscountById(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const discount = await DiscountService.getDiscountById(req.params.id);
      if (!discount) {
        res.status(404).json({ message: "Discount not found" });
      } else {
        res.status(200).json(discount);
      }
    } catch (error) {
      next(error);
    }
  }

  async getAllDiscounts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const discounts = await DiscountService.getAllDiscounts();
      await pagination(req, res, discounts, next);
      res.status(200).json(res.locals.pagination);
    } catch (error) {
      next(error);
    }
  }

  async updateDiscount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const discount = await DiscountService.updateDiscount(
        req.params.id,
        req.body
      );
      if (!discount) {
        res.status(404).json({ message: "Discount not found" });
      } else {
        res.status(200).json(discount);
      }
    } catch (error) {
      next(error);
    }
  }

  async deleteDiscount(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const result = await DiscountService.deleteDiscount(req.params.id);
      if (!result) {
        res.status(404).json({ message: "Discount not found" });
      } else {
        res.status(200).json({ message: "Discount deleted successfully" });
      }
    } catch (error) {
      next(error);
    }
  }
}

export default new DiscountController(); // Xuất một thể hiện duy nhất của lớp
