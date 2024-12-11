export const OPENAI_CONSTANTS = {
  API_KEY_PREFIX: 'sk-',
  DEFAULT_MODEL: 'gpt-4o',
  DEFAULT_MAX_TOKENS: 2000,
  DEFAULT_TEMPERATURE: 0,
  ASSISTANT_ID: 'asst_kAZ3qsSeH37QvOoreLCZyV4Q'
};

export const ADMIN_CONSTANTS = {
  MIN_PASSWORD_LENGTH: 8,
  SESSION_KEY: 'quora_user_session'
};

export const ERROR_MESSAGES = {
  MISSING_ENV: 'Missing required environment variables',
  INVALID_API_KEY: 'Invalid API key format',
  CONFIG_ERROR: 'Configuration validation failed',
  SETUP_REQUIRED: 'Environment setup required',
  ENV_FILE_MISSING: 'Environment file (.env) is missing',
  INVALID_FORMAT: 'Invalid environment variable format'
};