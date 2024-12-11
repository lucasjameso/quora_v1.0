import React from 'react';
import { ChatContainer } from './chat/ChatContainer';

export function HomePage() {
  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden">
      <ChatContainer />
    </div>
  );
}