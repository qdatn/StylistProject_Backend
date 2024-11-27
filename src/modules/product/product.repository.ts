import Product from "@modules/product/product.model";
import ProductDto from "@modules/product/dtos/product.dto";
import mongoose from "mongoose";

class ProductRepository {
  async findAll() {
    return await Product.find().populate("categories").populate("attributes");
  }

  async findById(id: string) {
    return await Product.findOne({ _id: id })
      .populate("categories")
      .populate("attributes");
  }

  async create(productData: ProductDto) {
    return await Product.create(productData);
  }

  async createMany(products: ProductDto[]) {
    return await Product.insertMany(products);
  }

  async update(id: string, productData: ProductDto) {
    const _id = new mongoose.Types.ObjectId(id);
    return await Product.findOneAndUpdate({ _id: _id }, productData, {
      new: true,
    });
  }

  async delete(id: string) {
    const _id: Object = new mongoose.Types.ObjectId(id);
    return await Product.deleteOne({ _id: _id });
  }

  async findByName(name: string) {
    return Product.find({ product_name: { $regex: name, $options: "i" } });
  }

  async findByFilter(query: any) {
    return Product.find(query);
  }
}

export default new ProductRepository();
