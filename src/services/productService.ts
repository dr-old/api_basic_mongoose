import Product from "../models/productModel"; // Adjust the path as needed

class ProductService {
  // Create a product
  async createProduct(data: any) {
    try {
      const product = await Product.findOne({ sku: data.sku });
      if (product) {
        return { status: 400, message: "Product with this SKU already exists" };
      } else {
        const newProduct = await Product.create(data);
        return {
          status: 201,
          message: "Product created successfully",
          data: newProduct,
        };
      }
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error creating product");
    }
  }

  // Get all products with optional filtering and sorting
  async getProducts(queryParams: any = {}) {
    try {
      const {
        sortBy,
        sortOrder,
        filterByCategoryName,
        filterByName,
        filterByDescription,
      } = queryParams;

      const filter: any = {};

      // Filtering by category name, product name, and description
      if (filterByCategoryName) {
        filter.categoryName = { $regex: filterByCategoryName, $options: "i" }; // case-insensitive search
      }

      if (filterByName) {
        filter.name = { $regex: filterByName, $options: "i" }; // case-insensitive search
      }

      if (filterByDescription) {
        filter.description = { $regex: filterByDescription, $options: "i" }; // case-insensitive search
      }

      // Sorting: Default to ascending order by 'name' if not specified
      const sortField = sortBy || "name";
      const order = sortOrder === "desc" ? -1 : 1;

      const products = await Product.find(filter).sort({
        [sortField]: order,
      });

      return {
        status: 200,
        message: "Success fetching products",
        data: products,
      };
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error fetching products");
    }
  }

  // Get a single product by id
  async getProduct(id: string) {
    try {
      const product = await Product.findById(id);
      if (!product) {
        return { status: 404, message: "Product not found" };
      }
      return {
        status: 200,
        message: "Product fetched successfully",
        data: product,
      };
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error fetching product");
    }
  }

  // Update a product by id
  async updateProduct(id: string, data: any) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, data, {
        new: true,
      });
      if (!updatedProduct) {
        return { status: 404, message: "Product not found" };
      }
      return {
        status: 200,
        message: "Product updated successfully",
        data: updatedProduct,
      };
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error updating product");
    }
  }

  // Delete a product by id
  async deleteProduct(id: string) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id);
      if (!deletedProduct) {
        return { status: 404, message: "Product not found" };
      }
      return {
        status: 202,
        message: "Product deleted successfully",
        data: deletedProduct,
      };
    } catch (error: any) {
      console.error(error.message);
      throw new Error("Error deleting product");
    }
  }
}

export const productService = new ProductService();
