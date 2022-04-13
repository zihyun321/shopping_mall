const express = require('express');
const router = express.Router();

const controller = require('./ctrl');

console.log('index탐');

/* user 라우팅 로직 */
router.post("/createUser", controller.checkAndCreateUser);
router.post("/checkUserInfo", controller.checkUserInfo);
router.post("/updateUserPoints", controller.updateUserPoints);

module.exports = router;


