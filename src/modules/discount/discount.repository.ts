import Discount from "./discount.model";
import DiscountDto from "./dtos/discount.dto";

class DiscountRepository {
  async create(discountData: DiscountDto) {
    return await Discount.create(discountData);
  }

  async findById(id: string) {
    return await Discount.findById(id).populate("apply_items");
  }

  async findAll() {
    return await Discount.find().populate("apply_items");
  }

  async update(id: string, discountData: DiscountDto) {
    return await Discount.findByIdAndUpdate(id, discountData, { new: true });
  }

  async delete(id: string) {
    return await Discount.findByIdAndDelete(id);
  }
}

export default new DiscountRepository();
