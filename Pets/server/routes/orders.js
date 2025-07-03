// קובץ זה הוחלף ב-productRoutes.js, orderRoutes.js, categoryRoutes.js. ניתן למחוק קובץ זה.
// קובץ ראוט הזמנות - מגדיר את ה-API ליצירת הזמנה חדשה בשרת

const express = require('express');
const Order = require('../models/Order');
const router = express.Router();

// Create new order
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Add more order routes as needed

module.exports = router;
