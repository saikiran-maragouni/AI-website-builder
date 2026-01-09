const express = require('express');
const { successResponse } = require('../utils/response');

// Import route modules
const generateRoutes = require('./generate.routes');
const previewRoutes = require('./preview.routes');
const paymentRoutes = require('./payment.routes');
const deployRoutes = require('./deploy.routes');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
    successResponse(res, {
        status: 'OK',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    }, 'Server is running');
});

// API routes
router.use('/generate', generateRoutes);
router.use('/preview', previewRoutes);
router.use('/payment', paymentRoutes);
router.use('/deploy', deployRoutes);

module.exports = router;
