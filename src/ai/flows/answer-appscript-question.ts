'use server';
/**
 * @fileOverview Answers user questions about AppScript project creation in DTable Analytics.
 *
 * - answerAppscriptQuestion - A function that handles the question answering process.
 * - AnswerAppscriptQuestionInput - The input type for the answerAppscriptQuestion function.
 * - AnswerAppscriptQuestionOutput - The return type for the answerAppscriptQuestion function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnswerAppscriptQuestionInputSchema = z.object({
  question: z.string().describe('The user question about AppScript project creation in DTable Analytics.'),
});
export type AnswerAppscriptQuestionInput = z.infer<typeof AnswerAppscriptQuestionInputSchema>;

const AnswerAppscriptQuestionOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question, based on DTable Analytics documentation and best practices.'),
});
export type AnswerAppscriptQuestionOutput = z.infer<typeof AnswerAppscriptQuestionOutputSchema>;

export async function answerAppscriptQuestion(input: AnswerAppscriptQuestionInput): Promise<AnswerAppscriptQuestionOutput> {
  return answerAppscriptQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'answerAppscriptQuestionPrompt',
  input: {schema: AnswerAppscriptQuestionInputSchema},
  output: {schema: AnswerAppscriptQuestionOutputSchema},
  prompt: `You are a helpful chatbot assisting DTable Analytics users with AppScript project creation.
  Answer the following question based on DTable Analytics documentation and best practices:

  Question: {{{question}}}

  Answer:`, // Provide a starting point for the answer, the rest will be generated.
});

const answerAppscriptQuestionFlow = ai.defineFlow(
  {
    name: 'answerAppscriptQuestionFlow',
    inputSchema: AnswerAppscriptQuestionInputSchema,
    outputSchema: AnswerAppscriptQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
