const express = require('express');
const router = express.Router();
const getAllProducts = require('../functions/getAllProducts');

router.get('/products', getAllProducts);

module.exports = router;