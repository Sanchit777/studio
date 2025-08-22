'use server';

import { answerAppscriptQuestion } from '@/ai/flows/answer-appscript-question';

export async function askQuestion(question: string): Promise<string> {
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
