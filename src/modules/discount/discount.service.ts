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
  async getDiscountsByProductId(productId: string) {
    return await DiscountRepository.findByProductId(productId);
  }
}

export default new DiscountService();
