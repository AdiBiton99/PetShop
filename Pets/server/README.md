# Pet Shop Server

שרת Node.js + Express + MongoDB עבור חנות מוצרים לחיות מחמד.

## הפעלה
1. התקן תלויות:
   ```powershell
   cd server
   npm install
   ```
2. הגדר קובץ .env (כבר קיים ברירת מחדל):
   - MONGO_URI=mongodb://localhost:27017/petshop
   - PORT=5000
3. ייבוא מוצרים לדוגמה:
   ```powershell
   node seed.js
   ```
4. הפעלת השרת:
   ```powershell
   npm start
   ```

## מבנה תיקיות
- server.js – קובץ ראשי
- models/ – מודלים של Product ו-Order
- routes/ – ראוטים למוצרים והזמנות
- seed.js – ייבוא מוצרים לדוגמה

## API
- GET /api/products – קבלת כל המוצרים
- POST /api/orders – יצירת הזמנה חדשה

---

לשאלות נוספות – פנה למגישי העבודה.
