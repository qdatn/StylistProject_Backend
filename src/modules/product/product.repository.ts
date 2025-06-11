import Product from "@modules/product/product.model";
import ProductDto from "@modules/product/dtos/product.dto";
import mongoose from "mongoose";

class ProductRepository {
  async findAll() {
    return await Product.find().populate("categories").sort({ createdAt: -1 });
  }

  async findAllProductActive() {
    return await Product.find({ status: true })
      .populate("categories")
      .sort({ createdAt: -1 });
  }

  async findById(id: string) {
    return await Product.findOne({ _id: id })
      .populate("categories")
      .sort({ createdAt: -1 });
  }

  async create(productData: ProductDto) {
    return await Product.create(productData);
  }

  async createMany(products: ProductDto[]) {
    return await Product.insertMany(products);
  }

  async update(id: string, productData: ProductDto) {
    const _id = new mongoose.Types.ObjectId(id);
    const totalQuantity = productData.variants!.reduce(
      (sum, v) => sum + v.stock_quantity,
      0
    );

    if (totalQuantity <= 0) {
      productData.status = false;
    }

    return await Product.findOneAndUpdate({ _id: _id }, productData, {
      new: true,
    });
  }

  async delete(id: string) {
    const _id: Object = new mongoose.Types.ObjectId(id);

    const isUsed = await mongoose.model("OrderItem").exists({ product: _id });
    if (isUsed) {
      const error = new Error(
        "Product is used in an order item and cannot be deleted."
      );
      (error as any).status = 409;
      throw error;
    }

    return await Product.deleteOne({ _id: _id });
  }

  async findByName(name: string) {
    return Product.find({ product_name: { $regex: name, $options: "i" } }).sort(
      { createdAt: -1 }
    );
  }

  async findByFilter(query: any) {
    return Product.find(query).sort({ createdAt: -1 });
  }
}

export default new ProductRepository();
