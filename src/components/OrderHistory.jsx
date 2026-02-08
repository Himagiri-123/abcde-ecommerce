import React, { useEffect, useState } from 'react';
import API from '../api';

const OrderHistory = ({ goBack }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get('/orders');
        setOrders(res.data);
      } catch (err) {
        console.log("Error fetching orders");
      }
    };
    fetchOrders();
  }, []);

  return (
    <div className="container">
      <button onClick={goBack} style={{marginBottom: '20px', background: '#ccc'}}>← Back to Shop</button>
      <h2>My Order History 📦</h2>
      
      {orders.length === 0 ? <p>No past orders found.</p> : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
          {orders.map((order) => (
            <div key={order._id} style={{border: '1px solid #ddd', padding: '15px', borderRadius: '8px'}}>
              <h4 style={{marginBottom: '10px', color: '#555'}}>Order ID: {order._id}</h4>
              {order.items.map((item, idx) => (
                <div key={idx} style={{display:'flex', justifyContent:'space-between', fontSize:'14px', marginBottom:'5px'}}>
                   <span>{item.itemId ? item.itemId.name : "Unknown Item"} (x{item.quantity})</span>
                </div>
              ))}
              <div style={{marginTop: '10px', borderTop: '1px dashed #ccc', paddingTop: '5px'}}>
                 <span style={{color: 'green', fontWeight: 'bold'}}>Status: Successful</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;