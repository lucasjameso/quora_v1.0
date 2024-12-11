import React from 'react';
import { ChatThread } from '../types';
import { ThreadItem } from './ThreadItem';

interface ThreadGroupProps {
  title: string;
  threads: ChatThread[];
}

export function ThreadGroup({ title, threads }: ThreadGroupProps) {
  return (
    <div className="py-2">
      <h3 className="px-4 py-2 text-xs font-medium text-[#7F7F7F] uppercase tracking-wider">
        {title}
      </h3>
      <div className="space-y-1">
        {threads.map(thread => (
          <ThreadItem key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
}