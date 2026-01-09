const express = require('express');
const { generateWebsite } = require('../controllers/generate.controller');
const { validateFields } = require('../middleware/validator');

const router = express.Router();

// POST /api/generate - Generate website from form input
router.post(
    '/',
    validateFields(['businessName', 'businessType', 'description']),
    generateWebsite
);

module.exports = router;
