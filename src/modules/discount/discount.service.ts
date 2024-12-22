import { Product } from "@modules/product";
import Discount from "./discount.model";
import DiscountRepository from "./discount.repository";
import DiscountDto from "./dtos/discount.dto";

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
    const discounts = await Discount.find({
      $or: [
        { type: "all" },
        { type: "product", apply_items: { $in: productIds } },
        {
          type: "category",
          apply_items: {
            $in: await this.getCategoryIdsFromProductIds(productIds),
          },
        },
      ],
      start_date: { $lte: new Date() },
      end_date: { $gte: new Date() },
      status: true,
    });

    return discounts.filter((discount) => {
      // Check conditions for minimum value and max discount
      if (discount.minimum_value && totalPrice < discount.minimum_value) {
        return false;
      }
      return true;
    });
  }

  private async getCategoryIdsFromProductIds(productIds: string[]) {
    const products = await Product.find({ _id: { $in: productIds } }).select(
      "categories"
    );
    const categoryIds = products.flatMap((product) => product.categories);
    return [...new Set(categoryIds.map((id) => id.toString()))]; // Remove duplicates
  }
}

export default new DiscountService();
