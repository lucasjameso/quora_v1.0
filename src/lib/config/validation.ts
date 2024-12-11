import { z } from 'zod';
import { envSchema } from './schemas';
import { ERROR_MESSAGES } from './constants';
import { ConfigurationError } from './errors';

export function validateEnvironment() {
  try {
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

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  suggestions: string[];
}

export function validateConfig(): ValidationResult {
  try {
    validateEnvironment();
    return {
      isValid: true,
      errors: [],
      suggestions: []
    };
  } catch (error) {
    return {
      isValid: false,
      errors: [error instanceof Error ? error.message : 'Unknown configuration error'],
      suggestions: ['Please check your environment configuration']
    };
  }
}