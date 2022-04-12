const express = require('express');
const router = express.Router();

const controller = require('./ctrl');

/* user 라우팅 로직 */
console.log('=== product index 탐 ===');
router.post("/getProductList", controller.getProductList);
router.post("/getProductStock", controller.getProductStock);
router.post("/updateProduct", controller.updateProduct);

module.exports = router;


