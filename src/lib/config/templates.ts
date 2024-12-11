import { OPENAI_CONSTANTS } from './constants';

export function generateEnvTemplate(): string {
  return `# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-your-openai-api-key-here
VITE_MODEL=${OPENAI_CONSTANTS.DEFAULT_MODEL}
VITE_MAX_TOKENS=${OPENAI_CONSTANTS.DEFAULT_MAX_TOKENS}
VITE_TEMPERATURE=${OPENAI_CONSTANTS.DEFAULT_TEMPERATURE}

# Admin Configuration
VITE_ADMIN_EMAIL=admin@example.com
VITE_ADMIN_PASSWORD=your-secure-password-here

# IMPORTANT: Replace all placeholder values above with your actual credentials
# For more information, see the documentation at:
# https://docs.openai.com/api-reference/authentication`;
}

export function generateEnvGuide(): string[] {
  return [
    'Create a new file named .env in the project root directory',
    'Copy the environment template shown below',
    'Replace the OpenAI API key with your key from https://platform.openai.com/account/api-keys',
    'Set your desired admin email and a secure password',
    'Save the file and restart the development server'
  ];
}

export function generateConfigGuide(): string[] {
  return [
    'Ensure all required environment variables are set in your .env file',
    'Verify your OpenAI API key starts with "sk-"',
    'Make sure your admin password meets the minimum length requirement',
    'Check that your admin email is in a valid format'
  ];
}