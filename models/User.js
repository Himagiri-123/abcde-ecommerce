const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    // ఇది చాలా ముఖ్యం: యూజర్ లాగిన్ అయినప్పుడు ఇక్కడ టోకెన్ సేవ్ అవుతుంది.
    // వేరే చోట లాగిన్ అయితే ఇది చెక్ చేస్తాం.
    token: { type: String, default: null } 
});

module.exports = mongoose.model('User', userSchema);