const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'User', 
        required: true 
    },
    items: [
        {
            itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
            quantity: { type: Number }
        }
    ],
    createdAt: { type: Date, default: Date.now } // ఆర్డర్ ఎప్పుడు పెట్టారో డేట్
});

module.exports = mongoose.model('Order', orderSchema);