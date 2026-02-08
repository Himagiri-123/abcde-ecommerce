const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true } // వస్తువు ధర
});

module.exports = mongoose.model('Item', itemSchema);