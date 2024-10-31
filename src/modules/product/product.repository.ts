import Product from "@modules/product/product.model";
import ProductDto from "@modules/product/dtos/product.dto";

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
    return await Product.findOneAndUpdate({ _id: id }, productData, {
      new: true,
    });
  }

  async delete(id: string) {
    return await Product.deleteOne({ _id: id });
  }
}

export default new ProductRepository();