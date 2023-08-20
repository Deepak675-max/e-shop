const path = require('path');

const rootDir = require('../helper/path');

const getProductData = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};

module.exports = {
    getProductData
};
