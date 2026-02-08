const Cart = require('../models/Cart');

// Add item to cart
exports.addToCart = async (req, res) => {
    const { itemId } = req.body;
    const userId = req.user._id;

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            const itemIndex = cart.items.findIndex(p => p.itemId == itemId);
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += 1;
            } else {
                cart.items.push({ itemId, quantity: 1 });
            }
        } else {
            cart = new Cart({
                userId,
                items: [{ itemId, quantity: 1 }]
            });
        }
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get Cart items
exports.getCart = async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user._id }).populate('items.itemId');
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Remove item from cart (New Feature)
exports.removeFromCart = async (req, res) => {
    const { itemId } = req.params;
    const userId = req.user._id;

    try {
        let cart = await Cart.findOne({ userId });
        if (!cart) return res.status(404).json({ message: "Cart not found" });

        cart.items = cart.items.filter(item => item.itemId.toString() !== itemId);
        
        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};