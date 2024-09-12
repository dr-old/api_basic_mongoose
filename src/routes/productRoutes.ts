import { Router } from "express";
import { productController } from "../controllers/productController";

const router = Router();

// Define routes for product management
router.post("/product", productController.addProduct);
router.get("/product", productController.getProducts);
router.get("/product/:id", productController.getProduct);
router.put("/product/:id", productController.updateProduct);
router.delete("/product/:id", productController.deleteProduct);

const productRoutes = router;

export default productRoutes;
