const express = require('express');

const { getProductData } = require('../controller/shop');

const router = express.Router();

router.get('/', getProductData);

module.exports = router;
