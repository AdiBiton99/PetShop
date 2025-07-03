// קומפוננטת עמוד התשלום - טופס למילוי פרטי לקוח, הצגת עגלה, שליחת הזמנה לשרת
import React, { useState } from "react";
import { createOrder } from "../../services/api";
import { useNavigate, useLocation } from "react-router-dom";
import { CART_KEY, ORDER_KEY } from "../../config";
import "./Checkout.css";

// אפשרויות משלוח
const shippingOptions = [
  { label: "משלוח אקספרס (עד 5 ימי עבודה) - 30₪", value: "express", price: 30 },
  { label: "משלוח סטנדרטי (עד 14 ימי עבודה) - 15₪", value: "regular", price: 15 },
  { label: "איסוף מסניף - חינם", value: "pickup", price: 0 },
];

export default function Checkout() {
  const navigate = useNavigate();
  const location = useLocation();
  // טען עגלה מ-location.state או מ-localStorage
  const cart = location.state?.cart || (() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  })();
  // סטייטים לטופס
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", shipping: shippingOptions[0].value });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // חישוב מחיר משלוח ומחיר כולל
  const shippingPrice = shippingOptions.find(opt => opt.value === form.shipping)?.price || 0;
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const total = cartTotal + shippingPrice;

  // ולידציה לטופס
  const validate = () => {
    if (!form.name || !form.email || !form.phone || !form.address) return "יש למלא את כל השדות";
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email)) return "אימייל לא תקין";
    if (cart.length === 0) return "העגלה ריקה";
    if (cart.some(item => item.quantity < 1)) return "כמות לא תקינה";
    return "";
  };

  // שליחת הזמנה לשרת
  const handleSubmit = async (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return setError(err);
    setError("");
    setLoading(true);
    try {
      const res = await createOrder({
        customerName: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        shippingMethod: form.shipping,
        shippingPrice,
        products: cart.map(item => ({
          productId: item._id,
          name: item.name,
          image: item.image,
          price: item.price,
          quantity: item.quantity,
          total: item.price * item.quantity
        })),
        totalPrice: total
      });
      // שמירת פרטי ההזמנה ב-localStorage
      const orderObj = {
        orderId: res.orderId,
        customerName: form.name,
        email: form.email,
        phone: form.phone,
        address: form.address,
        shippingMethod: form.shipping,
        shippingPrice,
        products: cart.map(item => ({
          ...item,
          total: item.price * item.quantity
        })),
        totalPrice: total
      };
      localStorage.setItem(ORDER_KEY, JSON.stringify(orderObj));
      // מעבר לעמוד הצלחת הזמנה
      navigate("/order-success", { state: { order: orderObj } });
      // ריקון עגלה ב-localStorage
      localStorage.removeItem(CART_KEY);
    } catch (e) {
      setError("שגיאה בשליחת ההזמנה");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="checkout-page" dir="rtl">
      <h2 style={{textAlign:'right'}}>ביצוע הזמנה</h2>
      {/* הצגת עגלה */}
      <div className="checkout-cart-list">
        <table dir="rtl">
          <thead>
            <tr>
              <th style={{textAlign:'right'}}>מוצר</th>
              <th style={{textAlign:'center'}}>כמות</th>
              <th style={{textAlign:'left'}}>סה"כ</th>
            </tr>
          </thead>
          <tbody>
            {cart.map(item => (
              <tr key={item._id}>
                <td style={{textAlign:'right'}}>
                  <img src={item.image} alt={item.name} width={40} style={{verticalAlign:'middle', borderRadius:6, marginLeft:8, float:'right'}} />
                  <span style={{marginRight:48}}>{item.name}</span>
                </td>
                <td style={{textAlign:'center'}}>{item.quantity}</td>
                <td style={{textAlign:'left'}}>{item.price * item.quantity}₪</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* טופס פרטי לקוח */}
      <form className="checkout-form" dir="rtl" onSubmit={handleSubmit} style={{textAlign:'right'}}>
        <input placeholder="שם" value={form.name} onChange={e => setForm(f => ({...f, name: e.target.value}))} style={{textAlign:'right'}} />
        <input placeholder="אימייל" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} style={{textAlign:'right'}} />
        <input placeholder="טלפון" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} style={{textAlign:'right'}} />
        <input placeholder="כתובת משלוח" value={form.address} onChange={e => setForm(f => ({...f, address: e.target.value}))} style={{textAlign:'right'}} />
        <select value={form.shipping} onChange={e => setForm(f => ({...f, shipping: e.target.value}))} style={{textAlign:'right'}}>
          {shippingOptions.map(opt => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        <div className="checkout-total">סה"כ לתשלום: {total}₪</div>
        {error && <div className="checkout-error">{error}</div>}
        <button type="submit" disabled={loading}>{loading ? "שולח..." : "בצע הזמנה"}</button>
      </form>
    </div>
  );
}
