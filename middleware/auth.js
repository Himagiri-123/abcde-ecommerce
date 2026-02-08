const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    try {
        // హెడర్ నుంచి టోకెన్ తీసుకోవడం (Bearer Token)
        const token = req.header('Authorization').replace('Bearer ', '');
        
        // టోకెన్ ఒరిజినల్ కాదా అని చెక్ చేయడం
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // ఆ టోకెన్ తో యూజర్ ఉన్నాడా అని డేటాబేస్ లో వెతకడం
        const user = await User.findOne({ _id: decoded.userId, token: token });

        if (!user) {
            throw new Error();
        }

        req.token = token;
        req.user = user; // యూజర్ వివరాలు రిక్వెస్ట్ లోకి పంపడం
        next(); // ముందుకు వెళ్ళు
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate (Login First).' });
    }
};

module.exports = auth;