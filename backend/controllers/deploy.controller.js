const { successResponse } = require('../utils/response');

/**
 * Mock website deployment
 * In production, this will handle actual deployment
 */
const deployWebsite = async (req, res, next) => {
    try {
        const { websiteId, deploymentType } = req.body;

        // Simulate deployment delay
        await new Promise(resolve => setTimeout(resolve, 1500));

        // Mock deployment response
        const mockDeployment = {
            websiteId,
            deploymentType,
            status: 'deployed',
            url: `https://${websiteId}.example.com`,
            deployedAt: new Date().toISOString(),
            message: deploymentType === 'auto'
                ? 'Website deployed automatically'
                : 'Manual deployment request submitted',
        };

        return successResponse(
            res,
            mockDeployment,
            'Deployment successful',
            201
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    deployWebsite,
};
