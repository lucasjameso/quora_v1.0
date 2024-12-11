import React, { useState, useEffect } from 'react';
import { AlertTriangle, CheckCircle, Info, XCircle, RefreshCw, Clock } from 'lucide-react';
import { LogManager } from '../../lib/logging';

const logger = new LogManager();

export function AdminLogViewer() {
  const [logs, setLogs] = useState<any[]>([]);
  const [filter, setFilter] = useState<'all' | 'info' | 'error' | 'warn'>('all');
  const [autoRefresh, setAutoRefresh] = useState(false);

  useEffect(() => {
    loadLogs();
    const interval = autoRefresh ? setInterval(loadLogs, 5000) : undefined;
    return () => clearInterval(interval);
  }, [autoRefresh]);

  const loadLogs = () => {
    const allLogs = logger.getLogs();
    setLogs(allLogs);
  };

  const LogIcon = ({ level }: { level: string }) => {
    switch (level) {
      case 'info':
        return <Info className="w-4 h-4 text-blue-400" />;
      case 'error':
        return <XCircle className="w-4 h-4 text-red-400" />;
      case 'warn':
        return <AlertTriangle className="w-4 h-4 text-yellow-400" />;
      default:
        return <CheckCircle className="w-4 h-4 text-green-400" />;
    }
  };

  const getLogStyle = (log: any) => {
    // Special handling for component status logs
    if (log.details?.components) {
      return 'bg-blue-500/10 border border-blue-500/20';
    }
    
    switch (log.level) {
      case 'error':
        return 'bg-red-500/10 border border-red-500/20';
      case 'warn':
        return 'bg-yellow-500/10 border border-yellow-500/20';
      default:
        return 'bg-[#333333]/30';
    }
  };

  const filteredLogs = logs.filter(log => 
    filter === 'all' ? true : log.level === filter
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex gap-2">
          {(['all', 'info', 'error', 'warn'] as const).map((level) => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                filter === level
                  ? 'bg-[#F46F25] text-white'
                  : 'bg-[#333333]/30 text-[#BFBFBF] hover:bg-[#333333]/50'
              }`}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm text-[#BFBFBF]">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded bg-[#333333]/30 border-[#333333] text-[#F46F25]"
            />
            Auto-refresh
          </label>
          <button
            onClick={loadLogs}
            className="p-2 rounded-lg bg-[#333333]/30 text-[#BFBFBF] hover:bg-[#333333]/50"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="space-y-2 max-h-[400px] overflow-y-auto">
        {filteredLogs.map((log, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg ${getLogStyle(log)}`}
          >
            <div className="flex items-start gap-3">
              <LogIcon level={log.level} />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-[#F4F5F1]">
                    {log.message}
                  </span>
                  <span className="text-xs text-[#7F7F7F]">
                    {log.timestamp.toLocaleTimeString()}
                  </span>
                </div>
                {log.details && (
                  <pre className="mt-2 p-2 text-xs bg-[#1A1A1A] rounded overflow-x-auto">
                    {JSON.stringify(log.details, null, 2)}
                  </pre>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}