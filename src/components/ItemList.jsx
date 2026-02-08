import React, { useEffect, useState } from 'react';
import API from '../api';

const ItemList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await API.get('/items');
        setItems(response.data);
      } catch (err) {
        console.error("Error fetching items");
      }
    };
    fetchItems();
  }, []);

  const addToCart = async (itemId) => {
    try {
      await API.post('/carts', { itemId });
      window.alert('Item added to cart! 🛒');
    } catch (err) {
      window.alert('Failed to add item');
    }
  };

  // --- కొత్త ఐకాన్ లాజిక్ (అన్ని వస్తువులకు ఐకాన్స్ వస్తాయి) ---
  const getIcon = (name) => {
    const n = name.toLowerCase();
    if (n.includes('laptop') || n.includes('macbook') || n.includes('dell')) return '💻';
    if (n.includes('watch')) return '⌚';
    if (n.includes('phone') || n.includes('iphone') || n.includes('samsung') || n.includes('mobile')) return '📱';
    if (n.includes('headphone') || n.includes('sony') || n.includes('audio')) return '🎧';
    if (n.includes('speaker') || n.includes('sound')) return '🔊';
    if (n.includes('mouse')) return '🖱️';
    if (n.includes('keyboard')) return '⌨️';
    if (n.includes('monitor') || n.includes('screen') || n.includes('tv')) return '🖥️';
    if (n.includes('pad') || n.includes('tablet')) return '📟';
    return '📦'; // ఏదీ మ్యాచ్ కాకపోతే ఈ బాక్స్ వస్తుంది
  };

  return (
    <div className="main-content">
      <h2 style={{ textAlign: 'center', margin: '30px 0', color: '#333', fontSize: '2rem' }}>
        Discover Our Products 🛍️
      </h2>
      
      <div className="grid-container">
        {items.map(item => (
          <div key={item._id} className="card">
            
            {/* ఇక్కడ మనం పైన రాసిన ఫంక్షన్ వాడుతున్నాం */}
            <div className="card-icon">
               {getIcon(item.name)}
            </div>
            
            <div className="card-body">
              <h3>{item.name}</h3>
              <span className="price">₹{item.price.toLocaleString()}</span>
              <button className="btn-add" onClick={() => addToCart(item._id)}>
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemList;