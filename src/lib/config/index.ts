import { openAIConfig } from './openai';
import { adminConfig } from './admin';

export const config = {
  openai: openAIConfig,
  admin: adminConfig
};

export * from './constants';
export * from './errors';
export * from './schemas';
export * from './validation';