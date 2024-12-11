import React from 'react';
import { config } from '../../lib/config';
import { Eye, EyeOff } from 'lucide-react';

export function AdminEnvViewer() {
  const [showSecrets, setShowSecrets] = React.useState(false);

  const maskValue = (value: string) => '*'.repeat(8);

  const formatValue = (value: string | number) => {
    if (typeof value === 'number') return value.toString();
    
    // For API keys and long strings, add word-break opportunities
    if (value.length > 40) {
      return value.replace(/(.{4})/g, '$1\u200B');
    }
    return value;
  };

  const envVars = {
    'OpenAI API Key': showSecrets ? formatValue(config.openai.apiKey) : maskValue(config.openai.apiKey),
    'OpenAI Model': config.openai.model,
    'Max Tokens': config.openai.maxTokens,
    'Temperature': config.openai.temperature,
    'Admin Email': showSecrets ? config.admin.email : maskValue(config.admin.email),
    'Admin Password': showSecrets ? config.admin.password : maskValue(config.admin.password)
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <button
          onClick={() => setShowSecrets(!showSecrets)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                   bg-[#333333]/30 text-[#BFBFBF] hover:bg-[#333333]/50 transition-colors"
        >
          {showSecrets ? (
            <>
              <EyeOff className="w-4 h-4" />
              Hide Secrets
            </>
          ) : (
            <>
              <Eye className="w-4 h-4" />
              Show Secrets
            </>
          )}
        </button>
      </div>

      <div className="space-y-2">
        {Object.entries(envVars).map(([key, value]) => (
          <div
            key={key}
            className="flex items-center justify-between p-3 rounded-lg bg-[#333333]/30"
          >
            <span className="text-sm text-[#BFBFBF]">{key}</span>
            <span 
              className="text-sm font-mono text-[#F4F5F1] break-all max-w-[60%] text-right"
              style={{ wordBreak: 'break-word' }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}