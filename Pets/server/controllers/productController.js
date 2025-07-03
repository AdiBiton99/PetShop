// קובץ controller למוצרים - לוגיקת שליפה, יצירה, עדכון ומחיקה של מוצרים
const Product = require('../models/Product');

// שליפת כל המוצרים
exports.getAllProducts = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category) filter.category = category;
    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// יצירת מוצר חדש (דוגמה, לא בשימוש כרגע)
exports.createProduct = async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
