const { errorResponse } = require('../utils/response');

/**
 * Validate request body fields
 */
const validateFields = (requiredFields) => {
    return (req, res, next) => {
        const missingFields = [];

        for (const field of requiredFields) {
            if (!req.body[field]) {
                missingFields.push(field);
            }
        }

        if (missingFields.length > 0) {
            return errorResponse(
                res,
                'Validation failed',
                400,
                { missingFields }
            );
        }

        next();
    };
};

module.exports = {
    validateFields,
};
