// קובץ ראוטים למוצרים - מגדיר את ה-API לשליפת מוצרים מהשרת
const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

// שליפת כל המוצרים
router.get('/', productController.getAllProducts);
// יצירת מוצר חדש (דוגמה)
router.post('/', productController.createProduct);

module.exports = router;
