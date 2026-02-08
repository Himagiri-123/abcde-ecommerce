import React, { useState } from 'react';
import API from '../api';

const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!username || !password) return alert("Please fill all fields");
    try {
      const response = await API.post('/users/login', { username, password });
      localStorage.setItem('token', response.data.token);
      setLoggedIn(true);
    } catch (err) {
      if (err.response && err.response.status === 403) {
        window.alert('You are already logged in on another device.');
      } else {
        window.alert('Invalid credentials');
      }
    }
  };

  const handleRegister = async () => {
    if (!username || !password) return alert("Please fill all fields");
    try {
      await API.post('/users', { username, password });
      window.alert('Registration Successful! Please Login.');
    } catch (err) {
      window.alert('User already exists');
    }
  };

  return (
    // ఈ స్టైల్ బాక్స్ ని స్క్రీన్ మధ్యలో ఉంచుతుంది
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh', 
      width: '100vw',
      backgroundColor: '#eef2f5' 
    }}>
      <div style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '15px', 
        boxShadow: '0 10px 25px rgba(0,0,0,0.1)', 
        textAlign: 'center',
        width: '100%',
        maxWidth: '400px' // మరీ పెద్దది కాకుండా
      }}>
        <h2 style={{ color: '#4b6cb7', marginBottom: '10px' }}>ABCDE Ventures</h2>
        <p style={{ color: '#777', marginBottom: '20px' }}>Secure Single-Device Login</p>
        
        <input 
          type="text" 
          placeholder="Username" 
          style={{ width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '8px' }}
          onChange={(e) => setUsername(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          style={{ width: '100%', padding: '12px', margin: '10px 0', border: '1px solid #ddd', borderRadius: '8px' }}
          onChange={(e) => setPassword(e.target.value)} 
        />
        
        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button onClick={handleLogin} style={{ flex: 1, background: '#27ae60', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Login</button>
          <button onClick={handleRegister} style={{ flex: 1, background: '#2980b9', color: 'white', padding: '12px', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Register</button>
        </div>
      </div>
    </div>
  );
};

export default Login;