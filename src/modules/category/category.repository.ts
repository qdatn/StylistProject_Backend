import Category from "@modules/category/category.model";
import CategoryDTO from "@modules/category/dtos/category.dto";
import mongoose from "mongoose";
class CategoryRepository {
  async findAll() {
    return await Category.find();
  }

  async findById(id: string) {
    return await Category.findOne({
      // search without casitive
      _id: id
    });
  }

  async create(CategoryData: CategoryDTO) {
    return await Category.create(CategoryData);
  }

  async createMany(categories: CategoryDTO[]) {
    return await Category.insertMany(categories);
  }

  async update(id: string, categoryData: CategoryDTO) {
    return await Category.findOneAndUpdate(
      { _id: id },
      categoryData,
      {
        new: true,
      }
    );
  }

  async delete(id: string) {
    const _id: Object = new mongoose.Types.ObjectId(id);
    return await Category.deleteOne({ _id: _id });
  }
}

export default new CategoryRepository();
