const { successResponse, errorResponse } = require('../utils/response');
const { fetchGeneratedSite } = require('../services/database.service');

/**
 * Get website preview by ID from database
 */
const getPreview = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Fetch website from database
        const website = await fetchGeneratedSite(id);

        if (!website) {
            return errorResponse(res, 'Website not found', 404);
        }

        // Return website data with camelCase keys for frontend
        return successResponse(
            res,
            {
                id: website.id,
                businessName: website.business_name,
                businessType: website.business_type,
                description: website.description,
                html: website.html,
                css: website.css,
                js: website.js,
                createdAt: website.created_at,
            },
            'Preview retrieved successfully'
        );
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getPreview,
};
