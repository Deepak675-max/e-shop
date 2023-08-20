const express = require('express');

const { getContactForm, addContactDetails } = require('../controller/contact');

const router = express.Router();

router.get('/contactus', getContactForm);

router.post('/success', addContactDetails);

module.exports = router;
