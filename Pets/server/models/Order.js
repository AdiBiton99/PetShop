// קובץ מודל הזמנה (Order) - מגדיר את מבנה מסמך הזמנה ב-MongoDB

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  shippingMethod: { type: String, required: true },
  shippingPrice: { type: Number, required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      name: String,
      image: String,
      price: Number,
      quantity: Number,
      total: Number
    }
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Order', orderSchema);
