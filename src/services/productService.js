import ProductRepository from "../repositories/productRepo.js";

class ProductService {
  async getAllProducts() {
    return await ProductRepository.findAll();
  }

  async getProductById(productId) {
    return await ProductRepository.findById(productId);
  }

  async createProduct(productData) {
    return await ProductRepository.create(productData);
  }

  async createManyProducts(products) {
    return await ProductRepository.createMany(products);
  }

  async updateProduct(productId, productData) {
    return await ProductRepository.update(productId, productData);
  }

  async deleteProduct(productId) {
    return await ProductRepository.delete(productId);
  }
}

export default new ProductService();
