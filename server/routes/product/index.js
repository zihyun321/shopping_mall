const express = require('express');
const router = express.Router();

const controller = require('./ctrl');

/* user 라우팅 로직 */
console.log('=== product index 탐 ===');
router.post("/getProductList", controller.getProductList);

module.exports = router;


