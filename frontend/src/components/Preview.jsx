import { useState, useEffect } from 'react';
import { getPreview } from '../services/api';

const Preview = ({ websiteId }) => {
    const [previewData, setPreviewData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState('preview'); // 'preview' or 'code'

    useEffect(() => {
        const fetchPreview = async () => {
            if (!websiteId) return;

            setLoading(true);
            setError('');

            try {
                const data = await getPreview(websiteId);
                setPreviewData(data);
            } catch (err) {
                setError(err.message || 'Failed to load preview');
            } finally {
                setLoading(false);
            }
        };

        fetchPreview();
    }, [websiteId]);

    if (loading) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Generating your website with AI...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="max-w-6xl mx-auto p-6">
                <div className="p-4 bg-red-100 border border-red-400 text-red-700 rounded-md">
                    {error}
                </div>
            </div>
        );
    }

    if (!previewData) {
        return null;
    }

    // Create a complete HTML document with inline CSS and JS
    const createPreviewHTML = () => {
        return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <style>${previewData.css}</style>
        </head>
        <body>
          ${previewData.html}
          <script>${previewData.js}</script>
        </body>
      </html>
    `;
    };

    return (
        <div className="max-w-6xl mx-auto p-6">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Header */}
                <div className="p-6 border-b">
                    <h2 className="text-2xl font-bold mb-2">Generated Website</h2>
                    <div className="flex gap-4 text-sm text-gray-600">
                        <p><span className="font-medium">Business:</span> {previewData.businessName}</p>
                        <p><span className="font-medium">Type:</span> {previewData.businessType}</p>
                    </div>
                </div>

                {/* Tabs */}
                <div className="border-b">
                    <div className="flex">
                        <button
                            onClick={() => setActiveTab('preview')}
                            className={`px-6 py-3 font-medium ${activeTab === 'preview'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            Live Preview
                        </button>
                        <button
                            onClick={() => setActiveTab('code')}
                            className={`px-6 py-3 font-medium ${activeTab === 'code'
                                    ? 'border-b-2 border-blue-600 text-blue-600'
                                    : 'text-gray-600 hover:text-gray-900'
                                }`}
                        >
                            View Code
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    {activeTab === 'preview' ? (
                        <div className="border rounded-lg overflow-hidden bg-white">
                            <iframe
                                srcDoc={createPreviewHTML()}
                                className="w-full h-[600px] border-0"
                                title="Website Preview"
                                sandbox="allow-scripts"
                            />
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* HTML Section */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">HTML</h3>
                                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm max-h-64 overflow-y-auto">
                                    <code>{previewData.html}</code>
                                </pre>
                            </div>

                            {/* CSS Section */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">CSS</h3>
                                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm max-h-64 overflow-y-auto">
                                    <code>{previewData.css}</code>
                                </pre>
                            </div>

                            {/* JavaScript Section */}
                            <div>
                                <h3 className="text-lg font-semibold mb-2 text-gray-800">JavaScript</h3>
                                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto text-sm max-h-64 overflow-y-auto">
                                    <code>{previewData.js}</code>
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Preview;
