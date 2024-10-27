import Category from "../models/categoryModel.js";

class CategoryRepository {
  async findAll() {
    return await Category.find();
  }

  async findByName(name) {
    return await Category.findOne({
      category_name: { $regex: name, $options: "i" },
    });
  }

  async create(CategoryData) {
    return await Category.create(CategoryData);
  }

  async createMany(Categorys) {
    return await Category.insertMany(Categorys);
  }

  async update(name, CategoryData) {
    return await Category.findOneAndUpdate(
      { category_name: { $regex: name, $options: "i" } },
      CategoryData,
      {
        new: true,
      }
    );
  }

  async delete(name) {
    return await Category.deleteOne({
      category_name: { $regex: name, $options: "i" },
    });
  }
}

export default new CategoryRepository();
