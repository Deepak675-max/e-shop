const path = require('path');

const rootDir = require('../helper/path');

// /admin/add-product => GET
const getAddProductFrom = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};

// /admin/add-product => POST
const addProductDetails = (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
};

module.exports = {
    getAddProductFrom,
    addProductDetails
}
