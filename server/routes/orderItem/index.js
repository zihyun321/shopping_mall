const express = require('express');
const router = express.Router();

const controller = require('./ctrl');

/* user 라우팅 로직 */
router.post("/createOrderItem", controller.createOrderItem);

module.exports = router;


