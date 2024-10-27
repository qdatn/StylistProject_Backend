import Product from "../models/productModel.js";

class ProductRepository {
  async findAll() {
    return await Product.find().populate("categories").populate("attributes");
  }

  async findById(id) {
    return await Product.findOne({ _id: id })
      .populate("categories")
      .populate("attributes");
  }

  async create(productData) {
    return await Product.create(productData);
  }

  async createMany(products) {
    return await Product.insertMany(products);
  }

  async update(id, productData) {
    return await Product.findOneAndUpdate({ _id: id }, productData, {
      new: true,
    });
  }

  async delete(id) {
    return await Product.deleteOne({ _id: id });
  }
}

export default new ProductRepository();
