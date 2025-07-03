// קומפוננטת עגלת קניות - מציגה את המוצרים שנבחרו, מאפשרת שינוי כמות, הסרה, וסיכום מחיר
import React from "react";
//import "../../assets/styles.css";
import "./Cart.css";

export default function Cart({ cart, onRemove, onChangeQty, onCheckout, onClose }) {
  // חישוב מחיר כולל של כל המוצרים בעגלה
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return (
    <div className="cart-modal">
      <div className="cart-content">
        {/* כפתור סגירה */}
        <button className="close-btn" onClick={onClose}>✖</button>
        <h2>עגלת קניות</h2>
        {/* הצגת מוצרים בעגלה או הודעה שהעגלה ריקה */}
        {cart.length === 0 ? (
          <p>העגלה ריקה</p>
        ) : (
          <>
            {/* טבלת מוצרים בעגלה */}
            <table className="cart-table" dir="rtl">
              <thead>
                <tr>
                  <th>מוצר</th>
                  <th>כמות</th>
                  <th>מחיר ליח'</th>
                  <th>סה"כ</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map(item => (
                  <tr key={item._id}>
                    {/* תמונה מימין */}
                    <td style={{display:'flex',alignItems:'center',gap:'8px'}}>
                      <img src={item.image} alt={item.name} width={40} style={{verticalAlign:'middle', borderRadius:6, marginLeft:8}} />
                      <span>{item.name}</span>
                    </td>
                    {/* כמות */}
                    <td>
                      <input type="number" min={1} value={item.quantity} onChange={e => onChangeQty(item._id, +e.target.value)} style={{width:40}} />
                    </td>
                    {/* מחיר ליחידה */}
                    <td>{item.price}₪</td>
                    {/* מחיר כולל למוצר */}
                    <td>{item.price * item.quantity}₪</td>
                    {/* כפתור הסרה משמאל */}
                    <td style={{textAlign:'left'}}><button onClick={() => onRemove(item._id)}>הסר</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* סיכום מחיר כולל */}
            <div className="cart-total">סה"כ: ₪{total}</div>
            {/* כפתור מעבר לעמוד הזמנה */}
            <button className="checkout-btn" onClick={onCheckout}>בצע הזמנה</button>
          </>
        )}
      </div>
    </div>
  );
}
