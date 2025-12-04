import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { CartContext } from '../context/CartContext';

function Navbar() {
  const { cart } = useContext(CartContext);
  const isLoggedIn = !!localStorage.getItem('token');
  
  const logout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" style={{fontSize: '1.5em'}}>Event Website</Link>
        <div>
          <Link to="/">Events</Link>
          <Link to="/cart">Cart ({cart.length})</Link>
          {isLoggedIn ? (
            <button onClick={logout} className="btn">Logout</button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;