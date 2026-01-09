const express = require('express');
const { getPreview } = require('../controllers/preview.controller');

const router = express.Router();

// GET /api/preview/:id - Get website preview by ID
router.get('/:id', getPreview);

module.exports = router;
