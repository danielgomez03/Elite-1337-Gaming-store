const express = require('express');
const router = express.Router();
const postCreateProduct = require('../functions/postCreateProduct');

router.post('/products', postCreateProduct);

module.exports = router;