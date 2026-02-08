const Order = require('../models/Order');
const Cart = require('../models/Cart');


exports.createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        
        const order = new Order({
            userId,
            items: cart.items
        });
        await order.save();

       
        await Cart.findOneAndDelete({ userId });

        res.status(201).json({ message: "Order placed successfully", orderId: order._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).populate('items.itemId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};