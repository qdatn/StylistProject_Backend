import Discount from "./discount.model";
import DiscountDto from "./dtos/discount.dto";

class DiscountRepository {
  async create(discountData: DiscountDto) {
    return await Discount.create(discountData);
  }

  async findById(id: string) {
    return await Discount.findById(id)
      .populate("apply_items")
      .sort({ createdAt: -1 });
  }

  async findAll() {
    return await Discount.find()
      .populate("apply_items")
      .sort({ createdAt: -1 });
  }

  async update(id: string, discountData: DiscountDto) {
    return await Discount.findByIdAndUpdate(id, discountData, { new: true });
  }

  async delete(id: string) {
    return await Discount.findByIdAndDelete(id);
  }
  async findByProductId(productId: string) {
    return await Discount.find({
      $or: [
        { apply_items: productId, type: "product", status: true },
        { type: "all", status: true },
      ],
    })
      .populate("apply_items")
      .sort({ createdAt: -1 });
  }

  async getAllProductIdsFromProductDiscounts() {
    const discounts = await Discount.find({ type: "product" }).select("apply_items");

    // Flatten all apply_items arrays và loại bỏ trùng
    const productIdSet = new Set<string>();
    discounts.forEach(discount => {
      discount.apply_items.forEach((id: any) => {
        productIdSet.add(id.toString());
      });
    });

    return Array.from(productIdSet);
  }
}

export default new DiscountRepository();
