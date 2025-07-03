// קובץ ראוטים להזמנות - מגדיר את ה-API ליצירת הזמנה חדשה
const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// יצירת הזמנה חדשה
router.post('/', orderController.createOrder);
// שליפת כל ההזמנות (דוגמה)
router.get('/', orderController.getAllOrders);

module.exports = router;
