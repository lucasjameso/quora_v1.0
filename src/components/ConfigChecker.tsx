import React from 'react';
import { AlertTriangle, CheckCircle, Copy } from 'lucide-react';
import { validateConfig } from '../lib/config';

export function ConfigChecker() {
  const [configStatus, setConfigStatus] = React.useState<{
    isValid: boolean;
    errors: string[];
  }>({ isValid: false, errors: [] });

  React.useEffect(() => {
    try {
      validateConfig();
      setConfigStatus({ isValid: true, errors: [] });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
      setConfigStatus({
        isValid: false,
        errors: errorMessage.split(',').map(e => e.trim())
      });
    }
  }, []);

  const copyEnvExample = async () => {
    try {
      const response = await fetch('/.env.example');
      const text = await response.text();
      await navigator.clipboard.writeText(text);
    } catch (error) {
      console.error('Failed to copy .env.example:', error);
    }
  };

  if (configStatus.isValid) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center p-6">
      <div className="max-w-2xl w-full space-y-8">
        <div className="p-6 bg-[#2A2A2A] rounded-lg border border-[#333333]/30">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-lg bg-red-500/10">
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-xl font-semibold text-[#F4F5F1] mb-2">
                Configuration Required
              </h1>
              
              <p className="text-[#BFBFBF] mb-6">
                Please set up your environment variables to continue. Create a .env file in the project root with the following variables:
              </p>

              <div className="space-y-4">
                {configStatus.errors.map((error, index) => (
                  <div 
                    key={index}
                    className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                  >
                    <p className="text-red-400 text-sm">{error}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 space-y-4">
                <h2 className="text-lg font-medium text-[#F4F5F1]">Setup Instructions:</h2>
                <ol className="list-decimal list-inside space-y-3 text-[#BFBFBF]">
                  <li>Create a new file named <code className="px-2 py-1 bg-[#333333]/50 rounded">.env</code> in the project root</li>
                  <li>Copy the contents from <code className="px-2 py-1 bg-[#333333]/50 rounded">.env.example</code></li>
                  <li>Replace the placeholder values with your actual credentials</li>
                  <li>Restart the development server</li>
                </ol>

                <div className="flex items-center gap-4 mt-6">
                  <button
                    onClick={copyEnvExample}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F46F25] text-white rounded-lg hover:bg-[#F46F25]/90 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Copy .env.example</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}