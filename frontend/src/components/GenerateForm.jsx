import { useState } from 'react';
import { generateWebsite } from '../services/api';

const GenerateForm = ({ onWebsiteGenerated }) => {
    const [formData, setFormData] = useState({
        businessName: '',
        businessType: '',
        description: '',
        features: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (!formData.businessName || !formData.businessType || !formData.description) {
            setError('Please fill in all required fields');
            return;
        }

        setLoading(true);

        try {
            const result = await generateWebsite({
                businessName: formData.businessName,
                businessType: formData.businessType,
                description: formData.description,
                features: formData.features ? formData.features.split(',').map(f => f.trim()) : [],
            });

            // Pass the generated website data to parent
            onWebsiteGenerated(result);
        } catch (err) {
            setError(err.message || 'Failed to generate website');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-6">Generate Your Website</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="businessName" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Name *
                    </label>
                    <input
                        type="text"
                        id="businessName"
                        name="businessName"
                        value={formData.businessName}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Enter your business name"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="businessType" className="block text-sm font-medium text-gray-700 mb-1">
                        Business Type *
                    </label>
                    <input
                        type="text"
                        id="businessType"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., E-commerce, Portfolio, Blog"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description *
                    </label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="4"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Describe your business and what you want on the website"
                        disabled={loading}
                    />
                </div>

                <div>
                    <label htmlFor="features" className="block text-sm font-medium text-gray-700 mb-1">
                        Features (optional)
                    </label>
                    <input
                        type="text"
                        id="features"
                        name="features"
                        value={formData.features}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Comma-separated features (e.g., Contact form, Gallery, Blog)"
                        disabled={loading}
                    />
                </div>

                {error && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-md">
                        {error}
                    </div>
                )}

                <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {loading ? 'Generating...' : 'Generate Website'}
                </button>
            </form>
        </div>
    );
};

export default GenerateForm;
