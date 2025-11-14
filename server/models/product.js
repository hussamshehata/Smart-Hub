import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  brand: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, default: 0 },
  description: String,
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
