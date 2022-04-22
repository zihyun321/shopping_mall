const express = require('express');
const router = express.Router();

const controller = require('./ctrl');

/* user 라우팅 로직 */
router.post("/createOrder", controller.createOrder);
router.post("/getOrder", controller.getOrder);

module.exports = router;


