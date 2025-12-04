import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';

const CartPage = () => {
  const { cart, removeFromCart, clearCart, getTotal } = useContext(CartContext);

  if (cart.length === 0) {
    return (
      <div className="container">
        <h2>Your Cart</h2>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn">Browse Events</Link>
      </div>
    );
  }

  return (
    <div className="container">
      <h2>Your Cart</h2>
      <div className="card">
        {cart.map((item, index) => (
          <div key={index} className="cart-item">
            <div>
              <h4>{item.title}</h4>
              <p>{item.date} - {item.location}</p>
              <p>${item.ticket_price}</p>
            </div>
            <button 
              onClick={() => removeFromCart(item._id)} 
              className="btn"
              style={{background: '#ff4444'}}
            >
              Remove
            </button>
          </div>
        ))}
        <div className="total">
          Total: ${getTotal()}
        </div>
        <div style={{textAlign: 'center', marginTop: '20px'}}>
          <button onClick={clearCart} className="btn" style={{background: '#ff4444', marginRight: '10px'}}>
            Clear Cart
          </button>
          <Link to="/checkout" className="btn">Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
};

export default CartPage;