const express = require('express');
const router = express.Router();

const controller = require('./ctrl');

console.log('=== order item index ===');
/* user 라우팅 로직 */
router.post("/createOrderItem", controller.createOrderItem);
router.post("/getOrderItem", controller.getOrderItem);
router.post("/getCancelOrderItem", controller.getCancelOrderItem);
router.post("/updateOrderItem", controller.updateOrderItem);

module.exports = router;


