const path = require('path');

const express = require('express');

const rootDir = require('../helper/path');

const router = express.Router();

router.get('/contact', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'contact.html'));
});

router.post('/success', (req, res, next) => {
    res.sendFile(path.join(rootDir, 'views', 'success.html'));
});

module.exports = router;
