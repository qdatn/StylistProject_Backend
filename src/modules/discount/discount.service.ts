import { Product } from "@modules/product";
import Discount from "./discount.model";
import DiscountRepository from "./discount.repository";
import DiscountDto from "./dtos/discount.dto";
import { Types } from "mongoose";
import { AttributeDTO } from "@modules/product/dtos/product.dto";

interface CartItem {
  productId: string;
  variantAttributes: AttributeDTO[];
  quantity: number;
}

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

  async applyDiscount(code: string, cartItems: CartItem[], totalPrice: number) {
    const discount = await Discount.findOne({ code, status: true });

    if (!discount) {
      throw new Error("Invalid or inactive discount code.");
    }

    const now = new Date();
    if (now < discount.start_date || now > discount.end_date) {
      throw new Error("This discount code is not valid at this time.");
    }

    if (discount.minimum_value && totalPrice < discount.minimum_value) {
      throw new Error(`Minimum order value is ${discount.minimum_value}.`);
    }

    if (discount.usage_limit && discount.used_count >= discount.usage_limit) {
      throw new Error("This discount has reached its usage limit.");
    }

    // Load product data
    const productIds = cartItems.map(
      (item) => new Types.ObjectId(item.productId)
    );
    const products = await Product.find({ _id: { $in: productIds } });

    let applicableAmount = 0;

    for (const item of cartItems) {
      const product = products.find((p) => p._id.toString() === item.productId);
      if (!product || !product.variants) continue;

      // Find matching variant by attributes
      const matchedVariant = product.variants.find((variant) =>
        item.variantAttributes.every((attr) =>
          variant.attributes.some(
            (vAttr) => vAttr.key === attr.key && vAttr.value === attr.value
          )
        )
      );

      if (!matchedVariant) continue;

      const itemTotal = matchedVariant.price * item.quantity;

      if (discount.type === "all") {
        applicableAmount += itemTotal;
      } else if (
        discount.type === "product" &&
        discount.apply_items.some(
          (id) => id.toString() === product._id.toString()
        )
      ) {
        applicableAmount += itemTotal;
      } else if (
        discount.type === "category" &&
        product.categories?.some((catId) =>
          discount.apply_items.some((id) => id.toString() === catId.toString())
        )
      ) {
        applicableAmount += itemTotal;
      }
    }

    if (applicableAmount === 0) {
      throw new Error("No items in the cart are eligible for this discount.");
    }

    // Calculate discount amount (percentage)
    const rawDiscountAmount = (discount.value / 100) * applicableAmount;
    const discountAmount = Math.min(
      rawDiscountAmount,
      discount.max_discount || Infinity
    );

    // Update used count
    discount.used_count += 1;
    await discount.save();

    return {
      discountAmount,
      finalPrice: totalPrice - discountAmount,
      // appliedOnAmount: applicableAmount,
    };
  }
}

export default new DiscountService();
