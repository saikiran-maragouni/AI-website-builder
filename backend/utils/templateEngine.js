const fs = require('fs').promises;
const path = require('path');

/**
 * Template Engine for AI Website Builder
 * Handles template selection and content injection
 */

// Template mapping based on business type
const TEMPLATE_MAP = {
    'restaurant': 'restaurant',
    'cafe': 'restaurant',
    'coffee': 'restaurant',
    'food': 'restaurant',
    'dining': 'restaurant',

    'ecommerce': 'ecommerce',
    'e-commerce': 'ecommerce',
    'shop': 'ecommerce',
    'store': 'ecommerce',
    'retail': 'ecommerce',
    'online store': 'ecommerce',

    'portfolio': 'portfolio',
    'personal': 'portfolio',
    'freelance': 'portfolio',
    'creative': 'portfolio',
    'designer': 'portfolio',
    'developer': 'portfolio',

    'services': 'services',
    'agency': 'services',
    'consulting': 'services',
    'professional': 'services',
    'business': 'services',
};

/**
 * Select appropriate template based on business type
 * @param {string} businessType - Type of business
 * @returns {string} Template name
 */
const selectTemplate = (businessType) => {
    const normalizedType = businessType.toLowerCase().trim();
    return TEMPLATE_MAP[normalizedType] || 'services'; // Default to services
};

/**
 * Read template file
 * @param {string} templateName - Name of the template
 * @returns {Promise<string>} Template HTML content
 */
const readTemplate = async (templateName) => {
    const templatePath = path.join(__dirname, '../templates', `${templateName}.html`);
    return await fs.readFile(templatePath, 'utf-8');
};

/**
 * Read CSS file
 * @returns {Promise<string>} CSS content
 */
const readCSS = async () => {
    const cssPath = path.join(__dirname, '../templates', 'styles.css');
    return await fs.readFile(cssPath, 'utf-8');
};

/**
 * Read JavaScript file
 * @returns {Promise<string>} JavaScript content
 */
const readJS = async () => {
    const jsPath = path.join(__dirname, '../templates', 'script.js');
    return await fs.readFile(jsPath, 'utf-8');
};

/**
 * Fill template with content
 * Supports simple placeholders: {{key}} and {{nested.key}}
 * Supports loops: {{#each array}} ... {{/each}}
 * @param {string} template - Template HTML
 * @param {object} content - Content object with data
 * @returns {string} Filled HTML
 */
const fillTemplate = (template, content) => {
    let filled = template;

    // Handle {{#each}} loops
    filled = filled.replace(/\{\{#each\s+(\w+(?:\.\w+)*)\}\}([\s\S]*?)\{\{\/each\}\}/g, (match, path, loopContent) => {
        const items = getNestedValue(content, path);
        if (!Array.isArray(items)) return '';

        return items.map(item => {
            let itemContent = loopContent;

            // Replace {{this}} with the item itself (for simple arrays)
            itemContent = itemContent.replace(/\{\{this\}\}/g, item);

            // Replace {{this.property}} with item properties
            itemContent = itemContent.replace(/\{\{this\.(\w+)\}\}/g, (m, prop) => {
                return item[prop] || '';
            });

            return itemContent;
        }).join('');
    });

    // Handle {{#if}} conditionals
    filled = filled.replace(/\{\{#if\s+(\w+(?:\.\w+)*)\}\}([\s\S]*?)\{\{\/if\}\}/g, (match, path, ifContent) => {
        const value = getNestedValue(content, path);
        return value ? ifContent : '';
    });

    // Handle simple placeholders {{key}} and {{nested.key}}
    filled = filled.replace(/\{\{(\w+(?:\.\w+)*)\}\}/g, (match, path) => {
        const value = getNestedValue(content, path);
        return value !== undefined ? value : match;
    });

    return filled;
};

/**
 * Get nested value from object using dot notation
 * @param {object} obj - Object to search
 * @param {string} path - Dot-separated path (e.g., 'hero.title')
 * @returns {*} Value at path or undefined
 */
const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
};

/**
 * Generate complete website from template and content
 * @param {string} businessType - Type of business
 * @param {object} content - Content JSON object
 * @returns {Promise<object>} Object with html, css, js, and templateName
 */
const generateWebsite = async (businessType, content) => {
    try {
        // Select template
        const templateName = selectTemplate(businessType);

        // Read template and assets
        const [templateHTML, css, js] = await Promise.all([
            readTemplate(templateName),
            readCSS(),
            readJS()
        ]);

        // Fill template with content
        const html = fillTemplate(templateHTML, content);

        return {
            html,
            css,
            js,
            templateName
        };
    } catch (error) {
        console.error('Error generating website:', error);
        throw new Error(`Template engine error: ${error.message}`);
    }
};

module.exports = {
    selectTemplate,
    generateWebsite,
    fillTemplate,
};
