const express = require('express');
const router = express.Router();
const  postCreateProduct  = require('../handlers/productsHandlers');

router.post('/products', postCreateProduct);

module.exports = router;