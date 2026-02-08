const Item = require('../models/Item');

// 1. అన్ని ఐటమ్స్ చూపించడం (Get All Items)
exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. కొత్త ఐటమ్ క్రియేట్ చేయడం (Create Item)
exports.createItem = async (req, res) => {
    try {
        const newItem = new Item(req.body);
        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};