const express = require('express');
const router = express.Router();
const  loadCategories  = require('../functions/loadCategoriesDb');

router.get('/', loadCategories);

module.exports = router;