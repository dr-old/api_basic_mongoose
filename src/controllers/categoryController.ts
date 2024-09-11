import { Request, Response } from "express";
import { categoryService } from "../services/categoryService"; // Assuming categoryService is correctly implemented
import { formatResponse } from "../utils/helpers";
import { categorySchema } from "../utils/validate"; // Assuming you have a validation schema for category

class CategoryController {
  // Add a category
  addCategory = async (req: Request, res: Response) => {
    const { error, value } = categorySchema.validate(req.body);

    if (error) {
      return formatResponse(res, 400, error.message);
    }

    try {
      const { status, message, data } = await categoryService.createCategory(
        value
      );
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Get all categories
  getCategories = async (req: Request, res: Response) => {
    try {
      const { status, message, data } = await categoryService.getCategories();
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Get a single category
  getCategory = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const { status, message, data } = await categoryService.getCategory(id);
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Update a category
  updateCategory = async (req: Request, res: Response) => {
    const { error, value } = categorySchema.validate(req.body);

    if (error) {
      return formatResponse(res, 400, error.message);
    }

    const id = req.params.id;

    try {
      const { status, message, data } = await categoryService.updateCategory(
        id,
        value
      );
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };

  // Delete a category
  deleteCategory = async (req: Request, res: Response) => {
    const id = req.params.id;

    try {
      const { status, message, data } = await categoryService.deleteCategory(
        id
      );
      return formatResponse(res, status, message, data);
    } catch (error: any) {
      return formatResponse(res, 500, error.message);
    }
  };
}

export const categoryController = new CategoryController();
