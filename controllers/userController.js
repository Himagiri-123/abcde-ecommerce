const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

       
        const hashedPassword = await bcrypt.hash(password, 10);

    
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // *** SINGLE DEVICE LOGIN CHECK ***
    
        if (user.token) {
            return res.status(403).json({ message: "You are already logged in on another device." });
        }

       
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

       
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        
        user.token = token;
        await user.save();

        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


exports.logout = async (req, res) => {
    try {
        
        req.user.token = null; 
        await req.user.save();
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};