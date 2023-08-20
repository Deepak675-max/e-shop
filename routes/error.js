const express = require('express');

const { showErrorPage } = require('../controller/error');

const router = express.Router();

router.use(showErrorPage);

module.exports = router;
