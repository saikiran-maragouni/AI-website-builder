const API_BASE_URL = '/api';

/**
 * Generate website from form data
 * @param {Object} data - Form data with businessName, businessType, description, features
 * @returns {Promise<Object>} Generated website data with id
 */
export const generateWebsite = async (data) => {
    try {
        const response = await fetch(`${API_BASE_URL}/generate`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to generate website');
        }

        return result.data;
    } catch (error) {
        console.error('Error generating website:', error);
        throw error;
    }
};

/**
 * Get website preview by ID
 * @param {string} id - Website ID
 * @returns {Promise<Object>} Website preview data
 */
export const getPreview = async (id) => {
    try {
        const response = await fetch(`${API_BASE_URL}/preview/${id}`);

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to fetch preview');
        }

        return result.data;
    } catch (error) {
        console.error('Error fetching preview:', error);
        throw error;
    }
};
