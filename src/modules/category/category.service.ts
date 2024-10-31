// services/categoryService.js
import CategoryRepository from "@modules/category/category.repository";
import CategoryDTO from "@modules/category/dtos/category.dto";

class CategoryService {
  async getAllCategories() {
    return await CategoryRepository.findAll();
  }

  async getCategoryByName(name: string) {
    return await CategoryRepository.findByName(name);
  }

  async createCategory(categoryData: CategoryDTO) {
    return await CategoryRepository.create(categoryData);
  }

  async createManyCategories(categoryDatas: CategoryDTO[]) {
    return await CategoryRepository.createMany(categoryDatas);
  }

  async updateCategory(name: string, categoryData: CategoryDTO) {
    return await CategoryRepository.update(name, categoryData);
  }

  async deleteCategory(name: string) {
    return await CategoryRepository.delete(name);
  }
}

export default new CategoryService();
