import React, { useEffect, useState } from 'react';
import { AlertTriangle, CheckCircle, Loader2 } from 'lucide-react';
import { assistantManager } from '../../lib/openai/assistant';

export function AssistantStatus() {
  const [status, setStatus] = useState<{
    checking: boolean;
    success?: boolean;
    message?: string;
    error?: string;
  }>({ checking: true });

  useEffect(() => {
    checkAssistantConnection();
  }, []);

  const checkAssistantConnection = async () => {
    try {
      const result = await assistantManager.validateConnection();
      setStatus({
        checking: false,
        success: result.success,
        message: result.success ? result.message : undefined,
        error: !result.success ? result.error : undefined
      });
    } catch (error) {
      setStatus({
        checking: false,
        success: false,
        error: error instanceof Error ? error.message : 'Failed to connect to OpenAI Assistant'
      });
    }
  };

  if (!status.checking && status.success) {
    return null;
  }

  return (
    <div className="p-4 rounded-lg bg-[#2A2A2A] border border-[#333333]/30">
      <div className="flex items-start gap-3">
        {status.checking ? (
          <Loader2 className="w-5 h-5 text-[#F46F25] animate-spin" />
        ) : status.success ? (
          <CheckCircle className="w-5 h-5 text-green-400" />
        ) : (
          <AlertTriangle className="w-5 h-5 text-red-400" />
        )}

        <div>
          <h3 className="font-medium text-[#F4F5F1]">
            {status.checking ? 'Checking Assistant Connection...' :
             status.success ? 'Assistant Connected' :
             'Assistant Connection Failed'}
          </h3>
          
          {status.message && (
            <p className="text-sm text-green-400 mt-1">{status.message}</p>
          )}
          
          {status.error && (
            <div className="mt-2">
              <p className="text-sm text-red-400">{status.error}</p>
              <p className="text-sm text-[#7F7F7F] mt-1">
                Please check your OpenAI API key and Assistant ID configuration.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}