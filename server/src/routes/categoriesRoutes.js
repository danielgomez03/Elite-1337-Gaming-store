const express = require('express');
const router = express.Router();
const { getAllCategories, getCategoryById } = require('../handlers/categoriesHandlers');

router.get('/', getAllCategories);
router.get('/:id', getCategoryById);

module.exports = router;