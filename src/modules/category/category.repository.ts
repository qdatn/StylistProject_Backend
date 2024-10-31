import Category from "@modules/category/category.model";
import CategoryDTO from "@modules/category/dtos/category.dto";
class CategoryRepository {
  async findAll() {
    return await Category.find();
  }

  async findByName(name: string) {
    return await Category.findOne({
      // search without casitive
      category_name: { $regex: name, $options: "i" },
    });
  }

  async create(CategoryData: CategoryDTO) {
    return await Category.create(CategoryData);
  }

  async createMany(Categorys: CategoryDTO[]) {
    return await Category.insertMany(Categorys);
  }

  async update(name: string, CategoryData: CategoryDTO) {
    return await Category.findOneAndUpdate(
      { category_name: { $regex: name, $options: "i" } },
      CategoryData,
      {
        new: true,
      }
    );
  }

  async delete(name: string) {
    return await Category.deleteOne({
      category_name: { $regex: name, $options: "i" },
    });
  }
}

export default new CategoryRepository();
