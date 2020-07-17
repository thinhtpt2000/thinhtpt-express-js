var express = require('express');

var controller = require('../controllers/cart.controller');
// var validate = require('../validate/user.validate');

var router = express.Router();

router.get('/add/:productId', controller.addToCart);

module.exports = router;