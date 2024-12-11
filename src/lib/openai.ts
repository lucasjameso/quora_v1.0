import OpenAI from 'openai';
import { config } from './config';

// Validate API key format
function validateApiKey(apiKey: string | undefined): { isValid: boolean; error?: string } {
  if (!apiKey) {
    return { isValid: false, error: 'OpenAI API key is not configured' };
  }
  if (!apiKey.startsWith('sk-')) {
    return { isValid: false, error: 'Invalid OpenAI API key format' };
  }
  return { isValid: true };
}

// Validate the API key
const { isValid, error } = validateApiKey(config.openai.apiKey);

// Export validation results
export const isApiKeyConfigured = isValid;
export const openAIError = error ? { type: 'invalid_key', message: error } : null;

// Initialize OpenAI client if API key is valid
export const openai = isValid ? new OpenAI({
  apiKey: config.openai.apiKey,
  dangerouslyAllowBrowser: true
}) : null;

export async function generateResponse(prompt: string): Promise<string> {
  if (!openai) {
    throw new Error('OpenAI API key not configured. Please add your API key to .env file');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: config.openai.model,
      messages: [
        {
          role: "system",
          content: "You are a specialized assistant with access to the Facade Access Solutions Library..."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: config.openai.temperature,
      max_tokens: config.openai.maxTokens,
      presence_penalty: 0,
      frequency_penalty: 0.3
    });

    const response = completion.choices[0]?.message?.content;
    
    if (!response) {
      throw new Error('No response generated');
    }

    return response;
    
  } catch (error) {
    console.error('OpenAI API Error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('insufficient_quota')) {
        throw new Error('API quota exceeded. Please check your OpenAI account billing status.');
      }
      if (error.message.includes('invalid_api_key')) {
        throw new Error('Invalid API key. Please check your OpenAI API key configuration in .env file.');
      }
      if (error.message.includes('rate_limit_exceeded')) {
        throw new Error('Rate limit exceeded. Please try again in a few moments.');
      }
      throw error;
    }
    
    throw new Error('Failed to generate response. Please try again later.');
  }
}