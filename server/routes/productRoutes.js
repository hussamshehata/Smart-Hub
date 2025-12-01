import express from "express";
import {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
} from "../controllers/productController.js";

const router = express.Router();

// Example URLs:
// GET /services/products           -> all products
// GET /services/products?brand=Apple -> products filtered by brand
// POST /services/products/Apple    -> create Apple product
// PATCH /services/products/:id     -> update
// DELETE /services/products/:id    -> delete

router.get("/", getProducts);
router.get("/:id", getProductById);
router.post("/:brand?", createProduct); // optional brand in URL
router.patch("/:id", updateProduct);
router.delete("/:id", deleteProduct);

export default router;
