const path = require('path');

const rootDir = require('../helper/path');

const Product = require('../models/product')

const getProductData = (req, res, next) => {
    const products = Product.fetchAll();
    console.log(products);
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

module.exports = {
    getProductData
};
