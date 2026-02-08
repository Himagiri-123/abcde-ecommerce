import React, { useEffect, useState } from 'react';
import API from '../api';

const Cart = ({ goBack }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  // Fetch cart items
  const fetchCart = async () => {
    try {
      const res = await API.get('/carts');
      if (res.data && res.data.items) {
        setCartItems(res.data.items);
        // Calculate Total
        const sum = res.data.items.reduce((acc, item) => acc + (item.itemId.price * item.quantity), 0);
        setTotal(sum);
      }
    } catch (err) {
      console.log("Cart empty or error");
    }
  };

  useEffect(() => { fetchCart(); }, []);

  // Remove Item
  const removeFromCart = async (itemId) => {
    try {
      await API.delete(`/carts/${itemId}`);
      fetchCart(); // Refresh list after delete
    } catch (err) {
      alert("Failed to remove item");
    }
  };

  // Checkout
  const handleCheckout = async () => {
    if (cartItems.length === 0) return alert("Cart is empty!");
    try {
      await API.post('/orders');
      alert("Order Placed Successfully! 🎉");
      setCartItems([]);
      setTotal(0);
      goBack(); // Go to history or home
    } catch (err) {
      alert("Checkout failed");
    }
  };

  return (
    <div className="container">
      <button onClick={goBack} style={{marginBottom: '20px', background: '#ccc'}}>← Back to Shop</button>
      <h2>Your Shopping Cart 🛒</h2>
      
      {cartItems.length === 0 ? (
        <p style={{textAlign:'center', marginTop:'20px'}}>Your cart is empty.</p>
      ) : (
        <>
          {cartItems.map((item) => (
            <div key={item._id} className="list-item">
              <div>
                <h4>{item.itemId.name}</h4>
                <small>Qty: {item.quantity} x ₹{item.itemId.price}</small>
              </div>
              <div style={{display:'flex', alignItems:'center', gap:'10px'}}>
                <strong>₹{item.itemId.price * item.quantity}</strong>
                <button className="btn-danger" onClick={() => removeFromCart(item.itemId._id)}>Remove</button>
              </div>
            </div>
          ))}
          
          <div style={{marginTop: '20px', borderTop: '2px solid #ddd', paddingTop: '20px', textAlign:'right'}}>
            <h3>Total Amount: ₹{total}</h3>
            <button className="btn-primary" style={{marginTop:'10px'}} onClick={handleCheckout}>
              Confirm Checkout & Pay
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;