const path = require('path');

const rootDir = require('../helper/path');

const getContactForm = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contact.html'));
};

const addContactDetails = (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
};

module.exports = {
    getContactForm,
    addContactDetails
};
