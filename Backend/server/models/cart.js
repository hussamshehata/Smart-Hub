import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product'
  },
  productName: {
    type: String,
    required: true,
    trim: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  imageUrl: String
}, {
  timestamps: true
});

const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  items: [cartItemSchema],
  subtotal: {
    type: Number,
    default: 0
  },
  total: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Calculate totals before saving
cartSchema.pre('save', function(next) {
  this.subtotal = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  this.total = this.subtotal;
  next();
});

export default mongoose.model('Cart', cartSchema);
