// קובץ seed.js - מייבא מוצרים לדוגמה למסד הנתונים (MongoDB)
// דוגמת מוצרים התחלתית לייבוא ל-MongoDB
const mongoose = require('mongoose');
const Product = require('./models/Product');

// הסרת שדה category מכל מוצר
const products = [
  {
    name: 'אוכל לכלבים',
    description: 'שק אוכל איכותי לכלבים 10 ק"ג',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa4Hv6yu-vkTTinV5Yh_ElztNDEBaoxWKZsA&s',
    price: 120,
    stock: 20
  },
  {
    name: 'צעצוע לחתול',
    description: 'עכבר צעצוע עם נוצות',
    image: 'https://i.pinimg.com/736x/25/2a/0f/252a0f37db115fce080389e3d6467ffc.jpg',
    price: 50,
    stock: 50
  },
  {
    name: 'מיטה לכלב',
    description: 'מיטה רכה ונעימה לכלב בינוני',
    image: 'https://i.pinimg.com/736x/8d/cf/1b/8dcf1bf935829347e9fe81349629ef5d.jpg',
    price: 90,
    stock: 15
  },
  {
    name: 'חול לחתולים',
    description: 'שק חול איכותי לחתולים 20 ליטר',
    image: 'https://d3m9l0v76dty0.cloudfront.net/system/photos/13319895/original/357bb1454f70f869e715032948933fc6.jpg',
    price: 60,
    stock: 30
  },
  {
    name: 'רצועה לכלב',
    description: 'רצועה עמידה ונוחה לטיולים',
    image: 'https://4dog.co.il/wp-content/uploads/2022/04/1282346091-528713178-1.jpg',
    price: 35,
    stock: 40
  },
  {
    name: 'קערת אוכל',
    description: 'קערת אוכל מנירוסטה לכלבים וחתולים',
    image: 'https://misupets.com/cdn/shop/files/BOWLWITHDOGFOODGREEN.jpg?v=1724931147',
    price: 20,
    stock: 60
  },
  {
    name: 'עצם לעיסה',
    description: 'עצם לעיסה טבעית לכלבים',
    image: 'https://www.likeah.co.il/images/itempics/8011789607115_20102019175206.jpg',
    price: 18,
    stock: 70
  },
  {
    name: 'כלוב נשיאה',
    description: 'כלוב נשיאה קשיח לחיות קטנות',
    image: 'https://lilopet.co.il/wp-content/uploads/2025/02/%D7%9B%D7%9C%D7%95%D7%91-%D7%94%D7%98%D7%A1%D7%94-%D7%90%D7%98%D7%9C%D7%A1.png',
    price: 110,
    stock: 10
  },
  {
    name: 'מברשת פרווה',
    description: 'מברשת להסרת פרווה מתה',
    image: 'https://bone-street.com/cdn/shop/files/06Doubl-SidedBrush.jpg?v=1718719754&width=1214',
    price: 28,
    stock: 35
  },
  {
    name: 'חטיף דנטלי',
    description: 'חטיף דנטלי לשמירה על שיני הכלב',
    image: 'https://petshome.co.il/wp-content/uploads/2022/01/%D7%A4%D7%A8%D7%95-%D7%A4%D7%9C%D7%90%D7%9F-%D7%91%D7%99%D7%A1%D7%A7%D7%95%D7%95%D7%99%D7%98-%D7%9C%D7%9B%D7%9C%D7%91-%D7%93%D7%A0%D7%98%D7%9C%D7%99.jpg',
    price: 22,
    stock: 55
  },
  // ...הוסף עוד מוצרים כרצונך
];

mongoose.connect('mongodb://localhost:27017/petshop', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('Products imported!');
  mongoose.disconnect();
}).catch(err => console.error(err));
