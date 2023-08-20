const path = require('path');
const fs = require('fs');

const rootDir = require('../helper/path');
const Product = require('../models/product')

// /admin/add-product => GET
const getAddProductFrom = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};


// /admin/add-product => POST
const addProductDetails = (req, res, next) => {
    const productData = new Product(req.body.title);
    productData.save();
    res.redirect('/');
};

module.exports = {
    getAddProductFrom,
    addProductDetails
}
