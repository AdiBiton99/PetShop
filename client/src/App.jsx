// קובץ App.jsx - רכיב ראשי של אפליקציית Pet Shop
// אחראי על ניהול עגלת קניות, ניווט בין עמודים, טעינת מוצרים, והצגת כל מבנה האתר

import React, { useEffect, useState } from "react";
import "./index.css";
import "./App.css";
import { fetchProducts } from "./services/api";
import NavBar from "./component/NavBar/NavBar.jsx";
import Cart from "./component/Cart/Cart.jsx";
import Checkout from "./component/Checkout/Checkout.jsx";
import OrderSuccess from "./component/OrderSuccess/OrderSuccess.jsx";
import WishList from "./component/WishList/WishList.jsx";
import { Route, Routes, useNavigate, useLocation } from "react-router-dom";
import { CART_KEY } from "./config";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showCart, setShowCart] = useState(false);
  const [pendingCheckout, setPendingCheckout] = useState(false);
  const [wishList, setWishList] = useState(() => {
    try {
      const saved = localStorage.getItem('WISHLIST_KEY');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [showWishList, setShowWishList] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchProducts().then(data => {
      setProducts(data);
    });
  }, []);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (location.state && location.state.clearCart) setCart([]);
  }, [location.state]);

  useEffect(() => {
    if (location.pathname === "/order-success") {
      setCart([]);
      localStorage.removeItem(CART_KEY);
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('WISHLIST_KEY', JSON.stringify(wishList));
  }, [wishList]);

  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find((item) => item._id === product._id);
      if (found) {
        return prev.map((item) =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };

  const changeQty = (id, qty) => {
    if (qty < 1) return;
    setCart((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: qty } : item
      )
    );
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item._id !== id));
  };

  const handleCheckout = () => {
    setPendingCheckout(true);
    setShowCart(false);
  };

  useEffect(() => {
    if (!showCart && pendingCheckout) {
      setPendingCheckout(false);
      navigate("/checkout", { state: { cart } });
    }
  }, [showCart, pendingCheckout, cart, navigate]);

  const addToWishList = (product) => {
    setWishList((prev) => prev.find((item) => item._id === product._id) ? prev : [...prev, product]);
  };

  const removeFromWishList = (id) => {
    setWishList((prev) => prev.filter((item) => item._id !== id));
  };

  const addWishToCart = (product) => {
    addToCart(product);
    removeFromWishList(product._id);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="App">
      <NavBar cartCount={cartCount} cartTotal={cartTotal} onCartClick={() => setShowCart(true)} onWishListClick={() => setShowWishList(true)} />
      <Routes>
        <Route path="/" element={
          <main>
            <div className="hero-section">
              <img className="hero-image" src="https://i.pinimg.com/736x/e6/3d/66/e63d66dcf85f86fbf8e5f75e3298f895.jpg" alt="תמונת שער" />
              <h1>Happy Paws-ברוכים הבאים ל</h1>
              <p>אצלנו תמצאו את כל מה שחיית המחמד שלכם צריכה -
              ממזון איכותי ועד צעצועים, מיטות ואביזרים באהבה</p>
            </div> 
            <div className="products-grid">
              {products.slice(0, 9).map((product) => (
                <div className="product-card" key={product._id}>
                  <img src={product.image} alt={product.name} />
                  <h3>{product.name}</h3>
                  <p>{product.description}</p>
                  <div className="price">{product.price}₪</div>
                  <div style={{display:'flex',flexDirection:'row-reverse',gap:'12px',marginTop:'1rem',justifyContent:'center'}}>
                    <button className="add-to-cart-btn" onClick={() => addToCart(product)}>הוסף לעגלה</button>
                    <button className="wishlist-btn" onClick={() => addToWishList(product)} aria-label="הוסף ל-WishList"><span style={{fontSize:'1.7rem', lineHeight:1}}>♥</span></button>
                  </div>
                </div>
              ))}
            </div>
          </main>
        } />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
      {showCart && (
        <Cart
          cart={cart}
          onRemove={removeFromCart}
          onChangeQty={changeQty}
          onCheckout={handleCheckout}
          onClose={() => setShowCart(false)}
        />
      )}
      {showWishList && (
        <WishList
          wishList={wishList}
          onRemove={removeFromWishList}
          onAddToCart={addWishToCart}
          onClose={() => setShowWishList(false)}
        />
      )}
    </div>
  );
}

export default App;
