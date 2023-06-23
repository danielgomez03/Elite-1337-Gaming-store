const express = require('express');
const router = express.Router();
const getProductByName = require('../functions/getProductByName.js');

router.get('/products/name', getProductByName);

module.exports = router;