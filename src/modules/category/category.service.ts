// services/categoryService.js
import CategoryRepository from "@modules/category/category.repository";
import CategoryDTO from "@modules/category/dtos/category.dto";

class CategoryService {
  async getAllCategories() {
    return await CategoryRepository.findAll();
  }

  async getCategoryById(categoryId: string) {
    return await CategoryRepository.findById(categoryId);
  }

  async createCategory(categoryData: CategoryDTO) {
    return await CategoryRepository.create(categoryData);
  }

  async createManyCategories(categoryDatas: CategoryDTO[]) {
    return await CategoryRepository.createMany(categoryDatas);
  }

  async updateCategory(categoryId: string, categoryData: CategoryDTO) {
    return await CategoryRepository.update(categoryId, categoryData);
  }

  async deleteCategory(categoryId: string) {
    return await CategoryRepository.delete(categoryId);
  }
}

export default new CategoryService();
