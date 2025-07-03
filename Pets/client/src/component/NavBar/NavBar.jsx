// קומפוננטת הניווט הראשית של האתר - מציגה את הלוגו, שם החנות, קישור לדף הבית, עגלת קניות
import React from "react";
import "./NavBar.css";

export default function NavBar({ cartCount, cartTotal, onCartClick, onWishListClick }) {
  return (
    <header className="navbar">
      {/* לוגו החנות + שם החנות */}
      <div className="logo">
        <img src="https://m.media-amazon.com/images/I/71N3WMU1lhL._AC_UF894,1000_QL80_.jpg" alt="logo" style={{height:36, verticalAlign:'middle', marginInlineEnd:10, borderRadius:8}} />
        Happy Paws
      </div>
      <nav style={{display:'flex',alignItems:'center',gap:'1.2rem'}}>
        {/* קישור לדף הבית */}
        <a href="/" style={{fontWeight:'bold',fontSize:'1.4rem',color:'#fff',textDecoration:'none',letterSpacing:'0.5px'}}>HOME</a>
        {/* כפתור WishList */}
        <button className="wishlist-navbar-btn" onClick={onWishListClick} style={{width:44,height:44,display:'flex',alignItems:'center',justifyContent:'center',borderRadius:'50%',border:'none',background:'#fff',color:'#BF9264',fontWeight:'bold',fontSize:'1.5rem',cursor:'pointer',boxShadow:'0 1px 4px #0001',transition:'background 0.2s'}} aria-label="רשימת משאלות">♥</button>
        {/* אייקון עגלת קניות, מספר מוצרים ומחיר כולל, לחיצה פותחת את המודל */}
        <span className="cart-icon" onClick={onCartClick} style={{ cursor: "pointer", display: 'flex', alignItems: 'center', background:'#fff', borderRadius:'12px', padding:'0 12px', height:44, boxShadow:'0 1px 4px #0001', transition:'background 0.2s' }}>
          <span style={{position:'relative', display:'inline-block'}}>
            <img src="https://d1csarkz8obe9u.cloudfront.net/posterpreviews/shopping-basket-design-template-14904f1442021df3807b73464a4857b4_screen.jpg?ts=1635717553" alt="cart" style={{height:38, marginInlineEnd:6, borderRadius:6, background:'#fff', verticalAlign:'middle'}} />
            {/* עיגול מספר מוצרים */}
            {cartCount > 0 && (
              <span className="cart-badge">{cartCount}</span>
            )}
          </span>
          <span style={{ marginInlineStart: 6, color: "#BF9264", fontWeight:'bold', fontSize:'1.2rem' }}>{cartTotal}₪</span>
        </span>
      </nav>
    </header>
  );
}
