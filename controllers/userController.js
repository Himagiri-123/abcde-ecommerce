const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// 1. కొత్త యూజర్‌ని రిజిస్టర్ చేయడం (Sign Up)
exports.register = async (req, res) => {
    try {
        const { username, password } = req.body;

        // యూజర్ ఆల్రెడీ ఉన్నాడా అని చెక్ చేయడం
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        // పాస్‌వర్డ్ ని సెక్యూర్ గా మార్చడం (Hashing)
        const hashedPassword = await bcrypt.hash(password, 10);

        // కొత్త యూజర్‌ని డేటాబేస్ లో సేవ్ చేయడం
        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 2. లాగిన్ చేయడం (Login) - ఇక్కడే అసలైన లాజిక్ ఉంది
exports.login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // యూజర్ ఉన్నాడా లేదా?
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // *** SINGLE DEVICE LOGIN CHECK ***
        // యూజర్ కి ఆల్రెడీ టోకెన్ ఉంటే, వేరే చోట లాగిన్ అయినట్టు లెక్క.
        if (user.token) {
            return res.status(403).json({ message: "You are already logged in on another device." });
        }

        // పాస్‌వర్డ్ కరెక్టా కాదా?
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // అంతా ఓకే అయితే, కొత్త టోకెన్ ఇవ్వాలి
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // ఆ టోకెన్ ని డేటాబేస్ లో సేవ్ చేయాలి (Lock వేసినట్టు)
        user.token = token;
        await user.save();

        res.status(200).json({ token, message: "Login successful" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// 3. లాగౌట్ (Logout)
exports.logout = async (req, res) => {
    try {
        // లాగౌట్ అయ్యేటప్పుడు టోకెన్ ని తీసేయాలి (Null చేయాలి)
        // అప్పుడే మళ్ళీ లాగిన్ అవ్వగలరు.
        req.user.token = null; 
        await req.user.save();
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};