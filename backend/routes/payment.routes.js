const express = require('express');
const { createOrder, verifyPayment } = require('../controllers/payment.controller');
const { validateFields } = require('../middleware/validator');

const router = express.Router();

// POST /api/payment/create-order - Create Razorpay order
router.post(
    '/create-order',
    validateFields(['amount', 'websiteId']),
    createOrder
);

// POST /api/payment/verify - Verify payment
router.post(
    '/verify',
    validateFields(['orderId', 'paymentId', 'signature', 'websiteId']),
    verifyPayment
);

module.exports = router;
