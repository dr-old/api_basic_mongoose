import { Router } from "express";
import { categoryController } from "../controllers/categoryController";

const router = Router();

// Define routes for category management
router.post("/category", categoryController.addCategory);
router.get("/category", categoryController.getCategories);
router.get("/category/:id", categoryController.getCategory);
router.put("/category/:id", categoryController.updateCategory);
router.delete("/category/:id", categoryController.deleteCategory);

const categoryRoutes = router;

export default categoryRoutes;
