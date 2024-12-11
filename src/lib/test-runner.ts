import { runPineconeTest } from './pinecone-test';
import { validateConfig } from './config';
import { LogManager } from './logging';

const logger = new LogManager();

export async function runTests() {
  try {
    logger.info('Starting system initialization...');
    
    // First validate all configuration
    validateConfig();
    logger.info('Base configuration validated successfully');
    
    // Run Pinecone test as a separate system component
    try {
      const queryResult = await runPineconeTest();
      logger.info('All system tests completed successfully', {
        components: {
          config: true,
          pinecone: true
        }
      });
      return {
        success: true,
        queryResult
      };
    } catch (error) {
      // Log Pinecone error but mark base system as operational
      logger.error('Pinecone component test failed', error);
      logger.info('Base system operational, but Pinecone integration unavailable', {
        components: {
          config: true,
          pinecone: false
        }
      });
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }

  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    logger.error('System initialization failed', {
      error: errorMessage,
      components: {
        config: false,
        pinecone: false
      }
    });
    return {
      success: false,
      error: errorMessage
    };
  }
}