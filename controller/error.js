const path = require('path');

const rootDir = require('../helper/path');

const showErrorPage = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', '404.html'));
};

module.exports = {
    showErrorPage
};
