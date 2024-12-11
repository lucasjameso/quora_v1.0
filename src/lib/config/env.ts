import { z } from 'zod';
import { OPENAI_CONSTANTS, ADMIN_CONSTANTS } from './constants';

// OpenAI environment schema
const openAISchema = z.object({
  VITE_OPENAI_API_KEY: z.string().min(1).startsWith('sk-'),
  VITE_MODEL: z.string().optional().default('gpt-4-turbo-preview'),
  VITE_MAX_TOKENS: z.string().optional().default('2000'),
  VITE_TEMPERATURE: z.string().optional().default('0'),
});

// Admin environment schema
const adminSchema = z.object({
  VITE_ADMIN_EMAIL: z.string().email(),
  VITE_ADMIN_PASSWORD: z.string().min(8),
});

// Combined environment schema
export const envSchema = z.object({
  ...openAISchema.shape,
  ...adminSchema.shape,
});

export type EnvConfig = z.infer<typeof envSchema>;

export function validateEnv(): EnvConfig {
  try {
    const env = envSchema.parse(import.meta.env);
    return env;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const missingVars = error.errors.map(e => e.path.join('.')).join(', ');
      throw new Error(`Missing or invalid environment variables: ${missingVars}. Please check your .env file.`);
    }
    throw error;
  }
}