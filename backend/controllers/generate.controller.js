const { successResponse } = require('../utils/response');
const { insertGeneratedSite } = require('../services/database.service');
const { generateContentJSON } = require('../services/gemini.service');
const { generateWebsite } = require('../utils/templateEngine');

/**
 * Generate website using hybrid template approach
 * 1. Gemini generates JSON content
 * 2. Template engine fills template with content
 * 3. Save both JSON and final HTML/CSS/JS to database
 */
const generateWebsiteController = async (req, res, next) => {
  try {
    const { businessName, businessType, description, features } = req.body;

    console.log('🚀 Starting hybrid website generation...');
    console.log(`📝 Business: ${businessName} (${businessType})`);

    // Step 1: Generate JSON content using Gemini AI
    console.log('🤖 Generating content with Gemini AI...');
    const contentJSON = await generateContentJSON({
      businessName,
      businessType,
      description,
      features,
    });

    console.log('✅ Content JSON generated');

    // Step 2: Generate website from template + content
    console.log('🎨 Filling template with AI content...');
    const { html, css, js, templateName } = await generateWebsite(
      businessType,
      contentJSON
    );

    console.log(`✅ Website generated using template: ${templateName}`);

    // Step 3: Save to database (both JSON and final output)
    console.log('💾 Saving to database...');
    const savedWebsite = await insertGeneratedSite({
      businessName,
      businessType,
      description,
      html,
      css,
      js,
      contentJSON, // Store JSON for future editing
      templateName, // Store template name for regeneration
    });

    console.log('✅ Website saved successfully!');

    // Return response
    return successResponse(
      res,
      {
        id: savedWebsite.id,
        businessName: savedWebsite.business_name,
        businessType: savedWebsite.business_type,
        description: savedWebsite.description,
        html: savedWebsite.html,
        css: savedWebsite.css,
        js: savedWebsite.js,
        templateName: savedWebsite.template_name,
        contentJSON: savedWebsite.content_json,
        createdAt: savedWebsite.created_at,
      },
      'Website generated successfully',
      201
    );
  } catch (error) {
    console.error('❌ Error in generateWebsiteController:', error);
    next(error);
  }
};

module.exports = {
  generateWebsite: generateWebsiteController,
};
