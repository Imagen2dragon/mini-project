import React, { useState } from "react";
import "./App.css";

// 1. Updated Product Data using your exact filenames from the screenshot
const PRODUCTS = [
  { id: 1, name: "Gaming Mouse", price: 30, image: "/images/gaming mouse.jpg" },
  {
    id: 2,
    name: "Mechanical Keyboard",
    price: 80,
    image: "/images/mechanical keyboard.jpg",
  },
  { id: 3, name: "Smart Watch", price: 100, image: "/images/Smart watch.jpg" },
  {
    id: 4,
    name: "Wireless Headphone",
    price: 50,
    image: "/images/wireless headphone.jpg",
  },
];

export default function App() {
  const [cart, setCart] = useState([]);
  const [page, setPage] = useState("home"); // 'home' or 'cart'

  // --- Logic Functions ---
  const addToCart = (product) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item,
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => setCart(cart.filter((item) => item.id !== id));

  const updateQty = (id, change) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item,
      ),
    );
  };

  // Grand Total calculation for the final button
  const grandTotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="app-container">
      {/* HEADER: Centered Title & Top-Right Cart Button */}
      <header className="header">
        <h1 className="title-centered" onClick={() => setPage("home")}>
          Shope Center
        </h1>

        {/* Cart button only displays on home page */}
        {page === "home" && (
          <button className="top-right-cart" onClick={() => setPage("cart")}>
            Cart ({cart.reduce((a, b) => a + b.quantity, 0)})
          </button>
        )}
      </header>

      {/* MAIN CONTENT: Left Aligned */}
      <main className="content-left">
        {page === "home" ? (
          <div className="product-grid">
            {PRODUCTS.map((p) => (
              <div key={p.id} className="item-card">
                <img src={p.image} alt={p.name} className="product-img" />
                {/* Item name displayed below the image */}
                <h3 className="product-name">{p.name}</h3>
                <p className="price">${p.price}</p>
                <div className="btn-group">
                  <button className="add-btn" onClick={() => addToCart(p)}>
                    Add to Cart
                  </button>
                  <button
                    className="uncart-btn"
                    onClick={() => removeFromCart(p.id)}
                  >
                    Uncart / Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="cart-page">
            <button className="back-link" onClick={() => setPage("home")}>
              ← Back to Products
            </button>
            <h2 className="cart-heading">Your Selection</h2>

            {cart.length === 0 ? (
              <p className="empty-msg">"Your cart is empty."</p>
            ) : (
              <div className="cart-list">
                {cart.map((item) => (
                  <div key={item.id} className="cart-row">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="cart-thumb"
                    />

                    <div className="cart-details">
                      {/* Name along side of + and - */}
                      <div className="name-qty-flex">
                        <span className="item-name-cart">{item.name}</span>
                        <div className="qty-controls">
                          <button onClick={() => updateQty(item.id, -1)}>
                            -
                          </button>
                          <span className="qty-num">{item.quantity}</span>
                          <button onClick={() => updateQty(item.id, 1)}>
                            +
                          </button>
                        </div>
                      </div>

                      {/* JSX Calculation Piece: Subtotal for each item */}
                      <div className="item-subtotal">
                        Calculation: ${item.price} × {item.quantity} units ={" "}
                        <strong>${item.price * item.quantity}</strong>
                      </div>

                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>
                ))}

                {/* FINAL BUTTON: Grand Total value */}
                <div className="footer-area">
                  <button className="checkout-total-btn">
                    TOTAL VALUE: ${grandTotal}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
