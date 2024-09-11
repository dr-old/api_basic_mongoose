import Category from "../models/categoryModel"; // Assuming you have the Category model in this path

class CategoryService {
  // Create a category
  async createCategory(data: any) {
    try {
      const category = await Category.findOne({ name: data.name });
      if (category) {
        return { status: 400, message: "Category already exists" };
      } else {
        const newCategory = await Category.create(data);
        return {
          status: 201,
          message: "Category created successfully",
          data: newCategory,
        };
      }
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error creating category");
    }
  }

  // Get all categories
  async getCategories() {
    try {
      const categories = await Category.find({});
      return {
        status: 200,
        message: "Success fetching categories",
        data: categories,
      };
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error fetching categories");
    }
  }

  // Get a single category by id
  async getCategory(id: string) {
    try {
      const category = await Category.findById(id);
      if (!category) {
        return { status: 404, message: "Category not found" };
      }
      return {
        status: 200,
        message: "Category fetched successfully",
        data: category,
      };
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error fetching category");
    }
  }

  // Update a category by id
  async updateCategory(id: string, data: any) {
    try {
      const updatedCategory = await Category.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updatedCategory) {
        return { status: 404, message: "Category not found" };
      }
      return {
        status: 200,
        message: "Category updated successfully",
        data: updatedCategory,
      };
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error updating category");
    }
  }

  // Delete a category by id
  async deleteCategory(id: string) {
    try {
      const deletedCategory = await Category.findByIdAndDelete(id);
      if (!deletedCategory) {
        return { status: 404, message: "Category not found" };
      }
      return {
        status: 202,
        message: "Category deleted successfully",
        data: deletedCategory,
      };
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error deleting category");
    }
  }
}

export const categoryService = new CategoryService();
