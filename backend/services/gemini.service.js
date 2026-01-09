const { GoogleGenerativeAI } = require('@google/generative-ai');
const config = require('../config');

/**
 * Generate structured JSON content using Gemini 2.5 Flash
 * Returns content with meta fields and editable flags
 */
const generateContentJSON = async (businessData) => {
    try {
        const { businessName, businessType, description, features } = businessData;

        // Initialize Gemini
        const genAI = new GoogleGenerativeAI(config.gemini.apiKey);
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        // Create prompt for JSON content generation
        const prompt = `Generate website content for the following business:

Business Name: ${businessName}
Business Type: ${businessType}
Description: ${description}
Features: ${features ? features.join(', ') : 'Standard features'}

Return ONLY valid JSON (no markdown, no explanations, no code blocks) with this EXACT structure:

{
  "meta": {
    "version": "1.0",
    "businessType": "${businessType.toLowerCase()}"
  },
  "hero": {
    "editable": true,
    "title": "catchy business title or slogan",
    "tagline": "compelling tagline that captures the essence",
    "cta": "call to action button text"
  },
  "about": {
    "editable": true,
    "heading": "About section heading",
    "content": "2-3 engaging paragraphs about the business, its story, mission, and values"
  },
  "features": {
    "editable": true,
    "heading": "Features or Services heading",
    "items": [
      {
        "title": "Feature 1 name",
        "description": "Feature 1 description",
        "icon": "emoji or icon name"
      },
      {
        "title": "Feature 2 name",
        "description": "Feature 2 description",
        "icon": "emoji or icon name"
      },
      {
        "title": "Feature 3 name",
        "description": "Feature 3 description",
        "icon": "emoji or icon name"
      }
    ]
  },
  "sections": [
    {
      "editable": true,
      "heading": "Additional section heading",
      "content": "Section content paragraph",
      "items": ["Item 1", "Item 2", "Item 3"]
    }
  ],
  "contact": {
    "editable": true,
    "heading": "Contact or CTA heading",
    "content": "Contact message or final call to action"
  }
}

Requirements:
- Make content relevant to the business type
- Use professional, engaging language
- Keep descriptions concise but informative
- Include at least 3 features
- Make the hero title catchy and memorable
- Ensure all text is appropriate for ${businessType}`;

        console.log('🤖 Calling Gemini AI to generate JSON content...');

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();

        console.log('✅ Gemini AI response received');

        // Extract JSON from response (handle potential markdown wrapping)
        let jsonText = text.trim();

        // Remove markdown code blocks if present
        jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?/g, '');

        // Parse JSON
        const contentJSON = JSON.parse(jsonText);

        console.log('📝 JSON content parsed successfully');

        return contentJSON;

    } catch (error) {
        console.error('❌ Error generating content with Gemini:', error);

        // If JSON parsing fails, provide a fallback
        if (error instanceof SyntaxError) {
            console.error('JSON parsing error, using fallback content');
            return createFallbackContent(businessData);
        }

        throw new Error(`Gemini AI content generation failed: ${error.message}`);
    }
};

/**
 * Fallback content if Gemini fails
 */
const createFallbackContent = (businessData) => {
    const { businessName, businessType, description } = businessData;

    return {
        meta: {
            version: "1.0",
            businessType: businessType.toLowerCase()
        },
        hero: {
            editable: true,
            title: businessName,
            tagline: description || `Welcome to ${businessName}`,
            cta: "Learn More"
        },
        about: {
            editable: true,
            heading: "About Us",
            content: description || `${businessName} is a ${businessType} dedicated to providing excellent service.`
        },
        features: {
            editable: true,
            heading: "What We Offer",
            items: [
                {
                    title: "Quality Service",
                    description: "We provide top-quality service to all our customers",
                    icon: "⭐"
                },
                {
                    title: "Professional Team",
                    description: "Our experienced team is here to help",
                    icon: "👥"
                },
                {
                    title: "Customer Focused",
                    description: "Your satisfaction is our priority",
                    icon: "💼"
                }
            ]
        },
        sections: [],
        contact: {
            editable: true,
            heading: "Get in Touch",
            content: "Contact us today to learn more about our services"
        }
    };
};

module.exports = {
    generateContentJSON,
};
