'use server';

import { answerAppscriptQuestion } from '@/ai/flows/answer-appscript-question';

export async function askQuestion(question: string): Promise<string> {
  if (!process.env.GEMINI_API_KEY) {
    console.error('Missing GEMINI_API_KEY environment variable.');
    return 'The AI service is not configured correctly. Please contact the administrator.';
  }

  if (!question) {
    return "Please provide a question.";
  }

  // Add a small delay to simulate network latency and show the loading indicator
  await new Promise(resolve => setTimeout(resolve, 1000));

  try {
    const result = await answerAppscriptQuestion({ question });
    return result.answer;
  } catch (error) {
    console.error('Error calling Genkit flow:', error);
    return "Sorry, I encountered an error while processing your question. Please try again.";
  }
}
