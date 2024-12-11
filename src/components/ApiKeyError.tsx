import React from 'react';
import { AlertCircle } from 'lucide-react';

export function ApiKeyError() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <h3 className="text-lg font-medium text-red-400 mb-2">OpenAI API Key Required</h3>
            <div className="space-y-3 text-red-300/90">
              <p>To use this application, you need to configure your OpenAI API key:</p>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Create a copy of <code className="px-1.5 py-0.5 rounded bg-red-500/20">.env.example</code> and name it <code className="px-1.5 py-0.5 rounded bg-red-500/20">.env</code></li>
                <li>Get your API key from <a href="https://platform.openai.com/account/api-keys" target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300 underline">OpenAI's dashboard</a></li>
                <li>Add your API key to the .env file:
                  <pre className="mt-2 p-3 rounded bg-red-500/20 text-sm">
                    VITE_OPENAI_API_KEY=sk-your-api-key-here
                  </pre>
                </li>
                <li>Restart the development server</li>
              </ol>
              <p className="text-sm">Note: Your API key should start with 'sk-' and be at least 40 characters long.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}