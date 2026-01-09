const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function testGemini() {
    console.log('Testing Gemini API...\n');

    if (!process.env.GEMINI_API_KEY) {
        console.error('ERROR: GEMINI_API_KEY not found in .env');
        return;
    }

    console.log('API Key found: ' + process.env.GEMINI_API_KEY.substring(0, 10) + '...\n');

    try {
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Try gemini-2.5-flash
        console.log('Trying model: gemini-2.5-flash');
        const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

        const result = await model.generateContent('Say hello in 5 words');
        const response = result.response;
        const text = response.text();

        console.log('\n✅ SUCCESS! Gemini API is working!\n');
        console.log('Response:', text);
        console.log('\n');

    } catch (error) {
        console.error('\n❌ FAILED\n');
        console.error('Status:', error.status || 'N/A');
        console.error('Message:', error.message);

        if (error.response) {
            console.error('Response data:', error.response.data);
        }
    }
}

testGemini();
