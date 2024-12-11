import { z } from 'zod';

const envSchema = z.object({
  VITE_OPENAI_API_KEY: z.string().min(1).startsWith('sk-'),
  VITE_MODEL: z.string().optional(),
  VITE_MAX_TOKENS: z.string().optional(),
  VITE_TEMPERATURE: z.string().optional(),
  VITE_ADMIN_EMAIL: z.string().email(),
  VITE_ADMIN_PASSWORD: z.string().min(8)
});

function validateEnv() {
  try {
    const env = envSchema.parse(import.meta.env);
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(e => e.path.join('.')).join(', ');
      throw new Error(`Missing or invalid environment variables: ${missingVars}`);
    }
    throw error;
  }
}

const env = validateEnv();

export const config = {
  openai: {
    apiKey: env.VITE_OPENAI_API_KEY,
    model: env.VITE_MODEL || 'gpt-4-turbo-preview',
    maxTokens: Number(env.VITE_MAX_TOKENS) || 2000,
    temperature: Number(env.VITE_TEMPERATURE) || 0,
  },
  admin: {
    email: env.VITE_ADMIN_EMAIL,
    password: env.VITE_ADMIN_PASSWORD
  }
};

export function validateConfig() {
  // OpenAI validation
  if (!config.openai.apiKey) {
    throw new Error('OpenAI API key is required');
  }
  if (!config.openai.apiKey.startsWith('sk-')) {
    throw new Error('Invalid OpenAI API key format');
  }

  // Admin validation
  if (!config.admin.email) {
    throw new Error('Admin email is required');
  }
  if (!config.admin.password) {
    throw new Error('Admin password is required');
  }

  return true;
}