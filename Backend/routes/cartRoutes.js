import express from "express";
const router = express.Router();
import {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
  checkout
} from "../controllers/cartController.js";

router.get("/:userId", getCart);
router.post("/:userId/items", addItemToCart);
router.put("/:userId/items/:itemId", updateItemQuantity);
router.delete("/:userId/items/:itemId", removeItemFromCart);
router.delete("/:userId", clearCart);
router.post("/:userId/checkout", checkout);


export default router;
