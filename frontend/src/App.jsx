import { useState } from 'react';
import GenerateForm from './components/GenerateForm';
import Preview from './components/Preview';

function App() {
  const [websiteId, setWebsiteId] = useState(null);

  const handleWebsiteGenerated = (websiteData) => {
    setWebsiteId(websiteData.id);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Website Builder
          </h1>
          <p className="text-gray-600">
            Generate your website with AI
          </p>
        </header>

        <div className="space-y-8">
          <GenerateForm onWebsiteGenerated={handleWebsiteGenerated} />

          {websiteId && <Preview websiteId={websiteId} />}
        </div>
      </div>
    </div>
  );
}

export default App;
