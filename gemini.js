// Gemini API helper for Ultimate Career Advisor
// Uses the local Node.js proxy at /api/gemini

export async function callGemini(prompt, assessmentData = null) {
  const body = { prompt };
  if (assessmentData) body.assessmentData = assessmentData;
  const response = await fetch('/api/gemini', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const error = await response.text();
    throw new Error('Gemini API error: ' + error);
  }
  const data = await response.json();
  return data.result || data.candidates?.[0]?.content?.parts?.[0]?.text || data.candidates?.[0]?.content || data.resultText || '';
}
