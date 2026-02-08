import React, { useState } from 'react';
import Login from './components/Login';
import ItemList from './components/ItemList';
import Navbar from './components/Navbar';
import Cart from './components/Cart';
import OrderHistory from './components/OrderHistory';
import './App.css';

function App() {
  const [isLoggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'));
  const [view, setView] = useState('home'); // 'home', 'cart', 'history'

  return (
    <div className="App">
      {!isLoggedIn ? (
        <Login setLoggedIn={setLoggedIn} />
      ) : (
        <>
          <Navbar setLoggedIn={setLoggedIn} setView={setView} />
          
          {}
          <div className="main-container">
            {view === 'home' && <ItemList />}
            {view === 'cart' && <Cart goBack={() => setView('home')} />}
            {view === 'history' && <OrderHistory goBack={() => setView('home')} />}
          </div>
        </>
      )}
    </div>
  );
}

export default App;