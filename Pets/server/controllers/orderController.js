// קובץ controller להזמנות - לוגיקת יצירה ושליפה של הזמנות
const Order = require('../models/Order');

// יצירת הזמנה חדשה
exports.createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json({ message: 'Order placed successfully', orderId: order._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// שליפת כל ההזמנות (דוגמה, לא בשימוש כרגע)
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
