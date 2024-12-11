import { Pinecone } from '@pinecone-database/pinecone';
import { config, validateConfig } from './config';
import { openai } from './openai';

// Validate configuration before initializing
validateConfig();

// Initialize Pinecone client with the correct host URL
const pinecone = new Pinecone({
  apiKey: config.pinecone.apiKey,
  environment: config.pinecone.environment,
  baseUrl: `https://${config.pinecone.host}`
});

// Get reference to the index
const index = pinecone.index(config.pinecone.indexName);

export async function queryPinecone(query: string, topK: number = 3) {
  try {
    console.log('Querying Pinecone with:', {
      indexName: config.pinecone.indexName,
      environment: config.pinecone.environment,
      host: config.pinecone.host
    });
    
    // Generate embedding for the query
    const embedding = await generateEmbedding(query);
    
    // Query Pinecone
    const queryResponse = await index.query({
      vector: embedding,
      topK,
      includeMetadata: true,
    });

    console.log('Pinecone query successful:', {
      matches: queryResponse.matches.length
    });

    return queryResponse.matches.map(match => ({
      id: match.id,
      score: match.score,
      metadata: match.metadata,
    }));
  } catch (error) {
    console.error('Error querying Pinecone:', error);
    throw new Error('Failed to query knowledge base');
  }
}

async function generateEmbedding(text: string): Promise<number[]> {
  if (!openai) {
    throw new Error('OpenAI client not initialized');
  }

  try {
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('Error generating embedding:', error);
    throw new Error('Failed to generate text embedding');
  }
}

// Export the Pinecone client and index for direct access if needed
export { pinecone, index };