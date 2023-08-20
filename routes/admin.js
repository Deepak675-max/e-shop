const express = require('express');

const { getAddProductFrom, addProductDetails } = require('../controller/admin');

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', getAddProductFrom);

// /admin/add-product => POST
router.post('/add-product', addProductDetails);

module.exports = router;
