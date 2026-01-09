const { errorResponse } = require('../utils/response');

/**
 * Global error handling middleware
 */
const errorHandler = (err, req, res, next) => {
    console.error('Error:', err);

    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    return errorResponse(res, message, statusCode);
};

/**
 * 404 Not Found handler
 */
const notFoundHandler = (req, res) => {
    return errorResponse(res, 'Route not found', 404);
};

module.exports = {
    errorHandler,
    notFoundHandler,
};
