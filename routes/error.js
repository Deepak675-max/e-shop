const path = require('path');

const express = require('express');

const errorController = require('../controllers/error');

const router = express.Router();

router.get('/error', errorController.getErrorPage)

module.exports = router;