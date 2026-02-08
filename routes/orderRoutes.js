const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/', auth, orderController.createOrder); // లాగిన్ అయితేనే ఆర్డర్ చేయగలరు
router.get('/', auth, orderController.getOrders);

module.exports = router;