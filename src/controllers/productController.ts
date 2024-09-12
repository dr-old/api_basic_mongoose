import { Request, Response } from "express";
import { productService } from "../services/productService"; // Adjust path as needed
import { formatResponse } from "../utils/helpers";
import { productSchema } from "../utils/validate"; // Assuming you have a validation schema for products

class ProductController {
  // Add a product
  addProduct = async (req: Request, res: Response) => {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return formatResponse(res, 400, error.message);
    }

    try {
      const { status, message, data } = await productService.createProduct(
        value
      );
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Get all products with optional filtering and sorting
  getProducts = async (req: Request, res: Response) => {
    const {
      filterByCategoryName,
      filterByName,
      filterByDescription,
      sortBy,
      sortOrder,
    } = req.query;

    try {
      const { status, message, data } = await productService.getProducts({
        filterByCategoryName,
        filterByName,
        filterByDescription,
        sortBy,
        sortOrder,
      });
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Get a single product
  getProduct = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const { status, message, data } = await productService.getProduct(id);
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Update a product
  updateProduct = async (req: Request, res: Response) => {
    const { error, value } = productSchema.validate(req.body);

    if (error) {
      return formatResponse(res, 400, error.message);
    }

    const id = req.params.id;

    try {
      const { status, message, data } = await productService.updateProduct(
        id,
        value
      );
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Delete a product
  deleteProduct = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const { status, message, data } = await productService.deleteProduct(id);
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };
}

export const productController = new ProductController();
