const express = require('express');
const { deployWebsite } = require('../controllers/deploy.controller');
const { validateFields } = require('../middleware/validator');

const router = express.Router();

// POST /api/deploy - Deploy website
router.post(
    '/',
    validateFields(['websiteId', 'deploymentType']),
    deployWebsite
);

module.exports = router;
