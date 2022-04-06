const express = require('express');
const router = express.Router();

const controller = require('./ctrl');

console.log('index탐');

/* user 라우팅 로직 */
router.post("/createUser", controller.checkAndCreateUser);
router.post("/getUserInfo", controller.getUserInfo);
router.post("/getUserInfo", controller.getUserInfo);
router.post("/checkUserInfo", controller.checkUserInfo);

module.exports = router;


