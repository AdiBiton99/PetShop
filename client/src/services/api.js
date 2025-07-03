// קובץ שירות API - פונקציות לשליפת נתונים ושליחת הזמנות לשרת
// שירות API לחיבור לשרת החנות
const SERVER_API = "http://localhost:5000/api";
export const BASE_URL = process.env.REACT_APP_API_URL


export async function fetchProducts() {
  try {
    const response = await fetch(`${SERVER_API}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    console.error("API fetchProducts error:", err);
    return []; // מחזיר מערך ריק במקום לגרום לקריסה
  }
}

export async function createOrder(orderData) {
  const response = await fetch(`${SERVER_API}/orders`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData)
  });
  return response.json();
}

/*// קובץ שירות API - פונקציות לשליפת נתונים ושליחת הזמנות לשרת
// מייבא את כתובת השרת מקובץ הסביבה (.env)
export const BASE_URL = process.env.REACT_APP_API_URL;

// שליפת כל המוצרים מהשרת
export async function fetchProducts() {
  try {
    const response = await fetch(`${BASE_URL}/products`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("API fetchProducts error:", err);
    return []; // במקרה של שגיאה, מחזיר מערך ריק
  }
}

// שליחת הזמנה לשרת
export async function createOrder(orderData) {
  try {
    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (err) {
    console.error("API createOrder error:", err);
    throw err;
  }
}*/

