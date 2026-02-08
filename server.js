const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

const userRoutes = require('./routes/userRoutes');
const itemRoutes = require('./routes/itemRoutes');
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');
const Item = require('./models/Item');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

// Routes
app.use('/users', userRoutes);
app.use('/items', itemRoutes);
app.use('/carts', cartRoutes);
app.use('/orders', orderRoutes);

// Database Connection & Seeding
mongoose.connect(process.env.MONGO_URI)
    .then(async () => {
        console.log("✅ MongoDB Connected Successfully!");
        
        // కొత్త ఐటమ్స్ యాడ్ చేసే లాజిక్
        const count = await Item.countDocuments();
        if (count < 5) { 
            console.log("⚙️ Adding more demo items...");
            await Item.insertMany([
                { name: "Smart Watch Series 7", price: 4500 },
                { name: "Sony Bluetooth Speaker", price: 3200 },
                { name: "Gaming Mechanical Keyboard", price: 2500 },
                { name: "4K LED Monitor", price: 18000 },
                { name: "Wireless Mouse", price: 800 }
            ]);
            console.log("📦 New Items Added! Restart Server if needed.");
        }
    })
    .catch((err) => console.log("❌ MongoDB Connection Error:", err));

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});