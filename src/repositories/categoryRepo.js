import Category from "../models/categoryModel.js";

class CategoryRepository {
  async findAll() {
    return await Category.find();
  }

  async findById(id) {
    return await Category.findOne({ category_id: id });
  }

  async create(CategoryData) {
    return await Category.create(CategoryData);
  }

  async createMany(Categorys) {
    return await Category.insertMany(Categorys);
  }

  async update(id, CategoryData) {
    return await Category.findOneAndUpdate({ category_id: id }, CategoryData, {
      new: true,
    });
  }

  async delete(id) {
    return await Category.deleteOne({ category_id: id });
  }
}

export default new CategoryRepository();
