// קובץ זה הוחלף ב-productRoutes.js, orderRoutes.js, categoryRoutes.js. ניתן למחוק קובץ זה.

// קובץ ראוט מוצרים - מגדיר את ה-API לשליפת מוצרים מהשרת

const express = require('express');
const Product = require('../models/Product');
const router = express.Router();

// Get all products or by category
router.get('/', async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) {
      filter.category = category;
    }
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add more product routes as needed

module.exports = router;
