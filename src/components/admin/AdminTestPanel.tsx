import React from 'react';
import { runTests } from '../../lib/test-runner';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';

export function AdminTestPanel() {
  const [isLoading, setIsLoading] = React.useState(false);
  const [results, setResults] = React.useState<{
    success: boolean;
    error?: string;
  } | null>(null);

  const handleRunTests = async () => {
    setIsLoading(true);
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
    <div className="space-y-4">
      <button
        onClick={handleRunTests}
        disabled={isLoading}
        className="px-4 py-2 bg-[#F46F25] text-white rounded-lg hover:bg-[#F46F25]/90 
                 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        {isLoading ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Running Tests...
          </span>
        ) : (
          'Run System Tests'
        )}
      </button>

      {results && (
        <div className={`p-4 rounded-lg ${
          results.success ? 'bg-green-500/10' : 'bg-red-500/10'
        }`}>
          <div className="flex items-start gap-3">
            {results.success ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <XCircle className="w-5 h-5 text-red-400" />
            )}
            <div>
              <h3 className={`font-medium ${
                results.success ? 'text-green-400' : 'text-red-400'
              }`}>
                {results.success ? 'All Tests Passed' : 'Tests Failed'}
              </h3>
              {results.error && (
                <p className="mt-2 text-sm text-red-300">{results.error}</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}