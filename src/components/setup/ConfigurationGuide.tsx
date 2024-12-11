import React, { useState } from 'react';
import { AlertTriangle, Copy, CheckCircle, ExternalLink } from 'lucide-react';
import { validateConfig } from '../../lib/config/validation';
import { AssistantStatus } from './AssistantStatus';

const ENV_TEMPLATE = `# OpenAI Configuration
VITE_OPENAI_API_KEY=sk-your-openai-api-key
VITE_MODEL=gpt-4-turbo-preview
VITE_MAX_TOKENS=2000
VITE_TEMPERATURE=0

# Admin Configuration
VITE_ADMIN_EMAIL=admin@example.com
VITE_ADMIN_PASSWORD=your-secure-password

# IMPORTANT: Replace all placeholder values with your actual credentials`;

const SETUP_GUIDE = [
  'Create a new file named .env in the project root directory',
  'Copy the environment template shown below',
  'Replace the OpenAI API key with your key from platform.openai.com',
  'Set your desired admin email and a secure password',
  'Save the file and restart the development server'
];

export function ConfigurationGuide() {
  const [configStatus] = useState(() => validateConfig());
  const [copySuccess, setCopySuccess] = useState(false);

  const copyEnvTemplate = async () => {
    try {
      await navigator.clipboard.writeText(ENV_TEMPLATE);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (error) {
      console.error('Failed to copy template:', error);
    }
  };

  if (configStatus.isValid) {
    return <AssistantStatus />;
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
                Please set up your environment variables to continue. Follow these steps to configure your application:
              </p>

              {configStatus.errors.length > 0 && (
                <div className="space-y-4 mb-8">
                  {configStatus.errors.map((error, index) => (
                    <div 
                      key={index}
                      className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg"
                    >
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-medium text-[#F4F5F1] mb-4">Setup Guide</h2>
                  <ol className="list-decimal list-inside space-y-3 text-[#BFBFBF]">
                    {SETUP_GUIDE.map((step, index) => (
                      <li key={index} className="text-sm">{step}</li>
                    ))}
                  </ol>
                </div>

                <div className="flex items-center gap-4">
                  <button
                    onClick={copyEnvTemplate}
                    className="flex items-center gap-2 px-4 py-2 bg-[#F46F25] text-white rounded-lg hover:bg-[#F46F25]/90 transition-colors"
                  >
                    {copySuccess ? (
                      <>
                        <CheckCircle className="w-4 h-4" />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Environment Template</span>
                      </>
                    )}
                  </button>

                  <a
                    href="https://platform.openai.com/account/api-keys"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-[#333333]/30 text-[#F4F5F1] rounded-lg hover:bg-[#333333]/50 transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Get API Key</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}