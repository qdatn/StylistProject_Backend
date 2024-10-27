// services/categoryService.js
import CategoryRepository from "../repositories/categoryRepo.js";

class CategoryService {
  async getAllCategories() {
    return await CategoryRepository.findAll();
  }

  async getCategoryByName(name) {
    return await CategoryRepository.findByName(name);
  }

  async createCategory(categoryData) {
    return await CategoryRepository.create(categoryData);
  }

  async createManyCategories(categoryDatas) {
    return await CategoryRepository.createMany(categoryDatas);
  }

  async updateCategory(name, categoryData) {
    return await CategoryRepository.update(name, categoryData);
  }

  async deleteCategory(name) {
    return await CategoryRepository.delete(name);
  }
}

export default new CategoryService();
