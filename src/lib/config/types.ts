import { z } from 'zod';
import { OPENAI_CONSTANTS, ADMIN_CONSTANTS } from './constants';

// OpenAI configuration schema
export const openAISchema = z.object({
  VITE_OPENAI_API_KEY: z.string()
    .min(1, 'OpenAI API key is required')
    .startsWith(OPENAI_CONSTANTS.API_KEY_PREFIX, 'OpenAI API key must start with sk-'),
  VITE_MODEL: z.string().optional().default(OPENAI_CONSTANTS.DEFAULT_MODEL),
  VITE_MAX_TOKENS: z.string().optional().default(String(OPENAI_CONSTANTS.DEFAULT_MAX_TOKENS)),
  VITE_TEMPERATURE: z.string().optional().default(String(OPENAI_CONSTANTS.DEFAULT_TEMPERATURE)),
});

// Admin configuration schema
export const adminSchema = z.object({
  VITE_ADMIN_EMAIL: z.string().email('Invalid admin email format'),
  VITE_ADMIN_PASSWORD: z.string().min(
    ADMIN_CONSTANTS.MIN_PASSWORD_LENGTH,
    `Admin password must be at least ${ADMIN_CONSTANTS.MIN_PASSWORD_LENGTH} characters`
  ),
});

// Combined environment schema
export const envSchema = z.object({
  ...openAISchema.shape,
  ...adminSchema.shape,
});

export type EnvConfig = z.infer<typeof envSchema>;