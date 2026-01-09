const { successResponse } = require('../utils/response');

/**
 * Mock Razorpay order creation
 * In production, this will use Razorpay SDK
 */
const createOrder = async (req, res, next) => {
    try {
        const { amount, websiteId } = req.body;

        // Mock order creation
        const mockOrder = {
            id: `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            amount: amount * 100, // Razorpay expects amount in paise
            currency: 'INR',
            websiteId,
            status: 'created',
            createdAt: new Date().toISOString(),
        };

        return successResponse(
            res,
            mockOrder,
            'Order created successfully',
            201
        );
    } catch (error) {
        next(error);
    }
};

/**
 * Mock payment verification
 * In production, this will verify Razorpay signature
 */
const verifyPayment = async (req, res, next) => {
    try {
        const { orderId, paymentId, signature, websiteId } = req.body;

        // Mock verification (always succeeds for testing)
        const mockVerification = {
            verified: true,
            orderId,
            paymentId,
            websiteId,
            downloadUrl: `/api/download/${websiteId}`,
            message: 'Payment verified successfully',
        };

        return successResponse(
            res,
            mockVerification,
            'Payment verified successfully'
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    createOrder,
    verifyPayment,
};
