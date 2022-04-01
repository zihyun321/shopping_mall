const express = require('express');
const router = express.Router();

const controller = require('./ctrl');

/* user 라우팅 로직 */
router.post("/createCart", controller.checkAndCreateCart);
router.post("/getCartList", controller.getCartList);
router.post('/deleteCart', controller.deleteCart);
router.post('/updateCart', controller.updateCart);

module.exports = router;


