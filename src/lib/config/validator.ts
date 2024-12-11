import { z } from 'zod';
import { envSchema } from './schemas';
import { ERROR_MESSAGES } from './constants';
import { ConfigError } from './errors';

export function validateEnv() {
  try {
    const env = envSchema.safeParse(import.meta.env);
    
    if (!env.success) {
      const missingVars = env.error.errors
        .map(err => err.path.join('.'))
        .join(', ');
      
      throw new ConfigError(
        `${ERROR_MESSAGES.MISSING_ENV}: ${missingVars}`,
        { errors: env.error.errors }
      );
    }

    return env.data;
  } catch (error) {
    if (error instanceof ConfigError) {
      throw error;
    }
    throw new ConfigError(ERROR_MESSAGES.CONFIG_ERROR);
  }
}