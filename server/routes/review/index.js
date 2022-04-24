const express = require('express');
const router = express.Router();

const controller = require('./ctrl');

/* user 라우팅 로직 */
router.post("/createReview", controller.createReview);

module.exports = router;


