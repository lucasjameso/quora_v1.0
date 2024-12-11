import { generateResponse } from './openai';
import { formatContent, formatRelatedQuestions } from './contentFormatter';

export async function generateChatResponse(userMessage: string) {
  try {
    const prompt = `
User question:
${userMessage}

Please provide a detailed response following the standard response format.`;

    const rawResponse = await generateResponse(prompt);
    
    // Format the response content
    const formattedContent = formatContent(rawResponse);
    
    // Extract and format related questions
    const questionsMatch = rawResponse.match(/### Related Questions\n([\s\S]+)$/);
    const relatedQuestions = questionsMatch
      ? formatRelatedQuestions(questionsMatch[1].split('\n').filter(q => q.trim()))
      : formatRelatedQuestions([]);

    return {
      content: formattedContent,
      relatedQuestions
    };
  } catch (error) {
    console.error('Error generating chat response:', error);
    throw error;
  }
}