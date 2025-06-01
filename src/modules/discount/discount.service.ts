import { Product } from "@modules/product";
import Discount from "./discount.model";
import DiscountRepository from "./discount.repository";
import DiscountDto from "./dtos/discount.dto";
import { Types } from "mongoose";

class DiscountService {
  async createDiscount(data: DiscountDto) {
    return await DiscountRepository.create(data);
  }

  async getDiscountById(id: string) {
    return await DiscountRepository.findById(id);
  }

  async getAllDiscounts() {
    return await DiscountRepository.findAll();
  }

  async updateDiscount(id: string, data: DiscountDto) {
    return await DiscountRepository.update(id, data);
  }

  async deleteDiscount(id: string) {
    return await DiscountRepository.delete(id);
  }

  async getAvailableDiscounts(productIds: string[], totalPrice: number) {
    const categoryIds = await this.getCategoryIdsFromProductIds(productIds);

    const discounts = await Discount.find({
      $or: [
        { type: "all" },
        { type: "product", apply_items: { $in: productIds } },
        {
          type: "category",
          apply_items: {
            $in: categoryIds,
          },
        },
      ],
      start_date: { $lte: new Date() },
      end_date: { $gte: new Date() },
      status: true,
    });

    return discounts
      .filter((discount) => {
        // Check conditions for minimum value and max discount
        if (
          (discount.minimum_value && totalPrice < discount.minimum_value) ||
          (discount.usage_limit && discount.used_count >= discount.usage_limit)
        ) {
          return false;
        }
        return true;
      })
      .sort((a, b) => b.value - a.value);
  }

  private async getCategoryIdsFromProductIds(productIds: string[]) {
    const products = await Product.find({ _id: { $in: productIds } }).select(
      "categories"
    );
    const categoryIds = products.flatMap((product) => product.categories);
    return [...new Set(categoryIds.map((id) => id.toString()))]; // Remove duplicates
  }

  async applyDiscount(code: string, productIds: string[], totalPrice: number) {
    const discount = await Discount.findOne({ code, status: true });

    if (!discount) {
      throw new Error("Invalid or inactive discount code.");
    }

    // Check if discount is still valid
    const now = new Date();
    if (now < discount.start_date || now > discount.end_date) {
      throw new Error("This discount code is not valid at this time.");
    }

    // Check conditions
    if (discount.minimum_value && totalPrice < discount.minimum_value) {
      throw new Error(
        `Minimum order value for this discount is ${discount.minimum_value}.`
      );
    }

    if (discount.usage_limit && discount.used_count >= discount.usage_limit) {
      throw new Error("This discount has reached its usage limit.");
    }

    // Check product/category applicability
    if (discount.type === "product") {
      const isApplicable = productIds.some((productId) =>
        discount.apply_items.includes(new Types.ObjectId(productId))
      );
      if (!isApplicable) {
        throw new Error(
          "This discount is not applicable to the selected products."
        );
      }
    } else if (discount.type === "category") {
      const categoryIds = await this.getCategoryIdsFromProductIds(productIds);
      const isApplicable = categoryIds.some((categoryId) =>
        discount.apply_items.includes(new Types.ObjectId(categoryId))
      );
      if (!isApplicable) {
        throw new Error(
          "This discount is not applicable to the selected categories."
        );
      }
    }

    // Calculate discount
    const discountAmount = Math.min(
      discount.value,
      discount.max_discount || Infinity
    );

    // Mark discount as used
    discount.used_count += 1;
    await discount.save();

    return {
      discountAmount,
      finalPrice: totalPrice - discountAmount,
    };
  }
}

export default new DiscountService();
