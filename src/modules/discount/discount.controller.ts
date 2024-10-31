import { Request, Response, NextFunction } from "express";
import DiscountService from "./discount.service";

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
      res.status(500).json({ message: "Error creating discount", error });
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
      }
      res.json(discount);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving discount", error });
    }
  }

  async getAllDiscounts(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const discounts = await DiscountService.getAllDiscounts();
      res.json(discounts);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving discounts", error });
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
      }
      res.json(discount);
    } catch (error) {
      res.status(500).json({ message: "Error updating discount", error });
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
      }
      res.json({ message: "Discount deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting discount", error });
    }
  }
}

export default new DiscountController(); // Xuất một thể hiện duy nhất của lớp
