const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth'); // మనం పైన రాసిన సెక్యూరిటీ గార్డ్

// 1. రిజిస్టర్ (కొత్త యూజర్) - POST /users
router.post('/', userController.register);

// 2. లాగిన్ - POST /users/login
router.post('/login', userController.login);

// 3. లాగౌట్ (సెక్యూరిటీ కావాలి) - POST /users/logout
router.post('/logout', auth, userController.logout);

module.exports = router;