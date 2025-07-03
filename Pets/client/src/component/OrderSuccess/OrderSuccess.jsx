// קומפוננטת עמוד הצלחת הזמנה - מציגה את פרטי ההזמנה לאחר השלמה
import React from "react";
import { useLocation } from "react-router-dom";
import { ORDER_KEY } from "../../config";
import "./OrderSuccess.css";

export default function OrderSuccess() {
  const location = useLocation();
  let { order } = location.state || {};

  // אם אין order ב-state, טען מ-localStorage
  if (!order) {
    try {
      const saved = localStorage.getItem(ORDER_KEY);
      if (saved) order = JSON.parse(saved);
    } catch {}
  }

  // אם יש order, מחק אותו מה-localStorage (שלא יישאר להזמנה הבאה)
  React.useEffect(() => {
    if (order) localStorage.removeItem(ORDER_KEY);
  }, [order]);

  if (!order) return <div>לא נמצאה הזמנה להצגה.</div>;

  return (
    <div className="order-success-page" dir="rtl">
      <h2>ההזמנה שולמה בהצלחה!</h2>
      <div className="order-details-box">
        {/* מספר הזמנה מוצג ראשון */}
        <div><b>מספר הזמנה:</b>  {order.orderId || order._id}</div>
        <div><b>שם:</b> {order.customerName}</div>
        <div><b>אימייל:</b> {order.email}</div>
        <div><b>טלפון:</b> {order.phone}</div>
        <div><b>כתובת:</b> {order.address}</div>
        <div><b>אופן משלוח:</b> {order.shippingMethod}</div>
        <div><b>מחיר משלוח:</b> {order.shippingPrice}₪</div>
        <div><b>סה"כ לתשלום:</b> {order.totalPrice}₪</div>
        <h2><b>מוצרים:</b></h2>
        {/* רשימת מוצרים */}
        <ul>
          {order.products.map((item, idx) => (
            <li key={idx} style={{direction:'rtl'}}>
              <img src={item.image} alt={item.name} width={32} style={{verticalAlign:'middle', borderRadius:6, marginInlineStart:8}} />
              <span>{item.name} - כמות: {item.quantity} - {item.total}₪</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
