import { config } from './config';
import { PineconeQueryRequest, PineconeQueryResponse } from './pinecone-types';

async function validatePineconeConfig() {
  const { pinecone } = config;
  
  // Log environment variables (safely)
  console.log('Pinecone Configuration:', {
    environment: pinecone.environment,
    indexName: pinecone.indexName,
    hasApiKey: !!pinecone.apiKey,
    host: pinecone.host
  });
  
  // Test the connection using describe_index_stats
  const url = `https://${pinecone.host}/describe_index_stats`;
  console.log('Attempting connection to Pinecone at:', url);
  
  try {
    console.log('Sending request to Pinecone...');
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Key': pinecone.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({}),
    });

    console.log('Pinecone response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Pinecone error response:', errorText);
      throw new Error(`Failed to connect to Pinecone (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    console.log('Pinecone connection successful:', data);
    return data;
  } catch (error) {
    console.error('Detailed Pinecone connection error:', error);
    throw new Error('Could not connect to Pinecone. Please check your network connection and Pinecone service status.');
  }
}

export async function testPineconeQuery(vector: number[]): Promise<PineconeQueryResponse> {
  const { pinecone } = config;
  const url = `https://${pinecone.host}/query`;
  
  console.log('Preparing Pinecone query test...');
  
  const queryRequest: PineconeQueryRequest = {
    vector,
    topK: 1,
    includeValues: true,
    includeMetadata: true
  };

  try {
    console.log('Sending query to Pinecone:', {
      url,
      topK: queryRequest.topK,
      vectorLength: vector.length
    });

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Api-Key': pinecone.apiKey,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(queryRequest),
    });

    console.log('Query response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Query error response:', errorText);
      throw new Error(`Pinecone query failed (${response.status}): ${errorText}`);
    }

    const data: PineconeQueryResponse = await response.json();
    console.log('Query successful:', {
      matchCount: data.matches.length,
      firstMatchScore: data.matches[0]?.score
    });
    
    return data;

  } catch (error) {
    console.error('Detailed query error:', error);
    throw error;
  }
}

export async function runPineconeTest() {
  try {
    console.log('Starting Pinecone test suite...');
    
    // First validate the configuration and connection
    const indexStats = await validatePineconeConfig();
    console.log('Pinecone connection validated successfully');
    
    // Generate a test vector of dimension 1536 (OpenAI's embedding dimension)
    const testVector = Array.from({ length: 1536 }, () => Math.random() * 2 - 1);
    console.log('Generated test vector:', {
      dimension: testVector.length,
      sample: testVector.slice(0, 3)
    });
    
    console.log('Running Pinecone query test...');
    const result = await testPineconeQuery(testVector);
    
    console.log('Test suite completed successfully');
    return {
      success: true,
      indexStats,
      queryResult: result
    };

  } catch (error) {
    console.error('Test suite failed:', error);
    throw error;
  }
}