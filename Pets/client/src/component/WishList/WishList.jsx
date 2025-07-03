// קומפוננטת WishList - רשימת משאלות למוצרים
import React from "react";
import "./WishList.css";

export default function WishList({ wishList, onRemove, onAddToCart, onClose }) {
  return (
    <div className="wishlist-modal" dir="rtl">
      <button className="wishlist-close-btn" onClick={onClose} title="סגור">✖</button>
      <h2>רשימת המשאלות שלי</h2>
      {wishList.length === 0 ? (
        <div className="wishlist-empty">הרשימה ריקה</div>
      ) : (
        <ul className="wishlist-list">
          {wishList.map((item) => (
            <li key={item._id} className="wishlist-item">
              <img src={item.image} alt={item.name} />
              <span style={{flex:1}}>{item.name}<br /><span style={{fontSize:'0.95em',color:'#555'}}>₪{item.price}</span></span>
              <button className="add-btn" onClick={() => onAddToCart(item)}>הוסף לעגלה</button>
              <button className="remove-btn" onClick={() => onRemove(item._id)}>הסר</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
