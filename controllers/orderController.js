const Order = require('../models/Order');
const Cart = require('../models/Cart');

// 1. కార్ట్ ని ఆర్డర్ గా మార్చడం (Checkout)
exports.createOrder = async (req, res) => {
    try {
        const userId = req.user._id;
        const cart = await Cart.findOne({ userId });

        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        // కొత్త ఆర్డర్ క్రియేట్ చేయడం
        const order = new Order({
            userId,
            items: cart.items
        });
        await order.save();

        // ఆర్డర్ అయ్యాక కార్ట్ ఖాళీ చేయడం (Delete Cart)
        await Cart.findOneAndDelete({ userId });

        res.status(201).json({ message: "Order placed successfully", orderId: order._id });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. పాత ఆర్డర్స్ చూడటం (History)
exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id }).populate('items.itemId');
        res.json(orders);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};