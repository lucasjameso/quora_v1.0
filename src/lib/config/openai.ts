import { validateEnvironment } from './validation';
import { OPENAI_CONSTANTS } from './constants';

const env = validateEnvironment();

export const openAIConfig = {
  apiKey: env.VITE_OPENAI_API_KEY,
  model: env.VITE_MODEL || OPENAI_CONSTANTS.DEFAULT_MODEL,
  maxTokens: Number(env.VITE_MAX_TOKENS) || OPENAI_CONSTANTS.DEFAULT_MAX_TOKENS,
  temperature: Number(env.VITE_TEMPERATURE) || OPENAI_CONSTANTS.DEFAULT_TEMPERATURE,
  assistantId: OPENAI_CONSTANTS.ASSISTANT_ID
};