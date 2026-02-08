import React from 'react';
import API from '../api';

const Navbar = ({ setLoggedIn, setView }) => {
  
  const handleLogout = async () => {
    try {
      await API.post('/users/logout');
      localStorage.clear();
      setLoggedIn(false);
    } catch (err) { 
      localStorage.clear(); 
      setLoggedIn(false); 
    }
  };

  return (
    <nav>
      <h1>ABCDE Store</h1>
      <div className="nav-buttons">
        <button onClick={() => setView('home')}>Home</button>
        <button onClick={() => setView('cart')}>My Cart</button>
        <button onClick={() => setView('history')}>Orders</button>
        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;