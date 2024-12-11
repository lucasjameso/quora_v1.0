import React, { useState } from 'react';
import { runTests } from '../lib/test-runner';
import { PineconeQueryResponse } from '../lib/pinecone-types';
import { Loader2, CheckCircle, XCircle, AlertTriangle } from 'lucide-react';

export function PineconeTest() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<{
    success: boolean;
    queryResult?: PineconeQueryResponse;
    error?: string;
  } | null>(null);

  const handleRunTest = async () => {
    setIsLoading(true);
    setResults(null);
    
    try {
      const testResults = await runTests();
      setResults(testResults);
    } catch (error) {
      setResults({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-[#F4F5F1] mb-2">Pinecone Integration Test</h2>
        <p className="text-[#BFBFBF]">Test the connection to your Pinecone vector database</p>
      </div>

      <div className="space-y-6">
        {/* Configuration Warning */}
        <div className="p-4 rounded-lg bg-[#F46F25]/10 border border-[#F46F25]/20">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-[#F46F25] mt-0.5" />
            <div>
              <h3 className="text-[#F46F25] font-medium mb-1">Before Running Tests</h3>
              <p className="text-[#BFBFBF] text-sm">
                Ensure your .env file contains valid Pinecone credentials:
              </p>
              <ul className="mt-2 space-y-1 text-sm text-[#BFBFBF]">
                <li>• VITE_PINECONE_API_KEY</li>
                <li>• VITE_PINECONE_ENVIRONMENT</li>
                <li>• VITE_PINECONE_INDEX_NAME</li>
              </ul>
            </div>
          </div>
        </div>

        <button
          onClick={handleRunTest}
          disabled={isLoading}
          className="px-4 py-2 bg-[#F46F25] text-white rounded-lg hover:bg-[#F46F25]/90 
                   disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader2 className="w-4 h-4 animate-spin" />
              Running Test...
            </span>
          ) : (
            'Run Test'
          )}
        </button>

        {results && (
          <div className="mt-6">
            <div className={`p-4 rounded-lg ${
              results.success ? 'bg-green-500/10' : 'bg-red-500/10'
            }`}>
              <div className="flex items-start gap-3">
                {results.success ? (
                  <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-400 mt-0.5" />
                )}
                <div>
                  <h3 className={`font-medium mb-2 ${
                    results.success ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {results.success ? 'Test Passed' : 'Test Failed'}
                  </h3>
                  
                  {results.error ? (
                    <div className="space-y-2">
                      <p className="text-red-300">{results.error}</p>
                      <div className="p-3 bg-[#2A2A2A] rounded-lg">
                        <h4 className="text-[#F4F5F1] font-medium mb-2">Troubleshooting Steps:</h4>
                        <ul className="space-y-1 text-sm text-[#BFBFBF]">
                          <li>1. Check your .env file configuration</li>
                          <li>2. Verify your Pinecone API key is valid</li>
                          <li>3. Confirm the index name and environment are correct</li>
                          <li>4. Ensure your Pinecone service is active</li>
                        </ul>
                      </div>
                    </div>
                  ) : results.queryResult && (
                    <div className="space-y-2">
                      <p className="text-[#F4F5F1]">
                        Found {results.queryResult.matches.length} matches
                      </p>
                      {results.queryResult.matches.map((match, index) => (
                        <div key={index} className="p-3 bg-[#2A2A2A] rounded-lg">
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="text-[#7F7F7F]">ID:</span>
                              <span className="ml-2 text-[#F4F5F1]">{match.id}</span>
                            </div>
                            <div>
                              <span className="text-[#7F7F7F]">Score:</span>
                              <span className="ml-2 text-[#F4F5F1]">
                                {match.score.toFixed(4)}
                              </span>
                            </div>
                          </div>
                          {match.metadata && (
                            <div className="mt-2 text-sm">
                              <span className="text-[#7F7F7F]">Metadata:</span>
                              <pre className="mt-1 p-2 bg-[#333333] rounded text-[#F4F5F1] overflow-x-auto">
                                {JSON.stringify(match.metadata, null, 2)}
                              </pre>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}