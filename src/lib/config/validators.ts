import { z } from 'zod';
import { envSchema } from './types';
import { ConfigurationError } from './errors';
import { ERROR_MESSAGES } from './constants';

export function validateEnv() {
  try {
    // Parse environment variables
    const env = envSchema.safeParse(import.meta.env);
    
    if (!env.success) {
      const missingVars = env.error.errors
        .map(err => err.path.join('.'))
        .join(', ');
      
      throw new ConfigurationError(
        `${ERROR_MESSAGES.MISSING_ENV}: ${missingVars}. Please check your .env file.`,
        { errors: env.error.errors }
      );
    }

    return env.data;
  } catch (error) {
    if (error instanceof ConfigurationError) {
      throw error;
    }
    throw new ConfigurationError(ERROR_MESSAGES.CONFIG_ERROR);
  }
}