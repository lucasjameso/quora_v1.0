export class LogManager {
  private logs: Array<{
    timestamp: Date;
    level: 'info' | 'error' | 'warn';
    message: string;
    details?: any;
  }> = [];

  info(message: string, details?: any) {
    this.addLog('info', message, details);
  }

  error(message: string, error?: any) {
    this.addLog('error', message, {
      error: error instanceof Error ? {
        message: error.message,
        stack: error.stack,
        name: error.name
      } : error
    });
  }

  warn(message: string, details?: any) {
    this.addLog('warn', message, details);
  }

  private addLog(level: 'info' | 'error' | 'warn', message: string, details?: any) {
    const log = {
      timestamp: new Date(),
      level,
      message,
      details
    };
    
    this.logs.push(log);
    this.printLog(log);
  }

  private printLog(log: any) {
    const timestamp = log.timestamp.toLocaleTimeString();
    const prefix = `[${timestamp}] ${log.level.toUpperCase()}:`;
    
    switch (log.level) {
      case 'error':
        console.error(prefix, log.message, log.details || '');
        break;
      case 'warn':
        console.warn(prefix, log.message, log.details || '');
        break;
      default:
        console.log(prefix, log.message, log.details || '');
    }
  }

  getLogs() {
    return [...this.logs];
  }

  getLogsByTimeWindow(minutes: number) {
    const now = new Date();
    const windowStart = new Date(now.getTime() - minutes * 60000);
    
    return this.logs.filter(log => log.timestamp >= windowStart);
  }

  findConflictingLogs(timeWindowMinutes: number = 5) {
    const logs = this.getLogsByTimeWindow(timeWindowMinutes);
    const conflicts = [];

    for (let i = 0; i < logs.length; i++) {
      for (let j = i + 1; j < logs.length; j++) {
        if (
          (logs[i].level === 'error' && logs[j].level === 'info') ||
          (logs[i].level === 'info' && logs[j].level === 'error')
        ) {
          conflicts.push({
            log1: logs[i],
            log2: logs[j],
            timeDiff: Math.abs(logs[j].timestamp.getTime() - logs[i].timestamp.getTime()) / 1000
          });
        }
      }
    }

    return conflicts;
  }
}