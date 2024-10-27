// controllers/categoryController.js
import CategoryService from "../services/categoryService.js";

class CategoryController {
  async getAllCategories(req, res) {
    try {
      const categories = await CategoryService.getAllCategories();
      res.status(200).json(categories);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getCategoryByName(req, res) {
    try {
      const category = await CategoryService.getCategoryByName(req.params.name);
      if (!category) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createCategory(req, res) {
    try {
      const category = await CategoryService.createCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async createManyCategories(req, res) {
    try {
      const categories = req.body; // Dữ liệu sản phẩm gửi từ client
      const newCategories = await CategoryService.createManyCategories(
        categories
      );
      res.status(201).json({
        message: "Categories added successfully",
        data: newCategories,
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async updateCategory(req, res) {
    try {
      const updatedCategory = await CategoryService.updateCategory(
        req.params.name,
        req.body
      );
      if (!updatedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async deleteCategory(req, res) {
    try {
      const deletedCategory = await CategoryService.deleteCategory(
        req.params.name
      );
      if (!deletedCategory) {
        return res.status(404).json({ message: "Category not found" });
      }
      res.status(200).json({ message: "Category deleted" });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
}

export default new CategoryController();
