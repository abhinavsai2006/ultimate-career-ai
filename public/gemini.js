console.log('gemini.js loaded');
// Gemini API helper for browser (no imports/exports)
// Assumes you have a proxy endpoint at /api/gemini or similar

async function callGemini(prompt, assessmentData) {
    try {
        const response = await fetch('/api/gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ prompt, assessmentData })
        });
        if (!response.ok) throw new Error('Gemini API error');
        return await response.text();
    } catch (e) {
        return JSON.stringify([{ title: 'Gemini API Error', description: e.message }]);
    }
}

window.callGemini = callGemini;

console.log('window.callGemini set:', typeof window.callGemini);
