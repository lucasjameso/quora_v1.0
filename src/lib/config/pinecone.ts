import { validateEnv } from './validators';
import { PINECONE_CONSTANTS } from './constants';

const env = validateEnv();

export const pineconeConfig = {
  apiKey: env.VITE_PINECONE_API_KEY,
  environment: env.VITE_PINECONE_ENVIRONMENT || PINECONE_CONSTANTS.DEFAULT_ENVIRONMENT,
  indexName: env.VITE_PINECONE_INDEX_NAME,
  host: env.VITE_PINECONE_HOST
};