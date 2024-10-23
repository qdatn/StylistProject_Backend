import Product from "../models/productModel.js";

class ProductRepository {
  async findAll() {
    return await Product.find();
  }

  async findById(id) {
    return await Product.findOne({ product_id: id });
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async createMany(products) {
    return await Product.insertMany(products);
  }

  async update(id, productData) {
    return await Product.findOneAndUpdate({ product_id: id }, productData, {
      new: true,
    });
  }

  async delete(id) {
    return await Product.deleteOne({ product_id: id });
  }
}

export default new ProductRepository();
