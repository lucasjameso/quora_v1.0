import React from 'react';
import { MessageItem } from './MessageItem';
import { useChatStore } from '../../store/chatStore';
import { motion } from 'framer-motion';
import { messageItemVariants } from './animations';

interface MessageListProps {
  className?: string;
}

export function MessageList({ className = '' }: MessageListProps) {
  const { activeThreadId, threads } = useChatStore();
  const messages = threads.find(t => t.id === activeThreadId)?.messages || [];
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className={`w-full max-w-3xl mx-auto py-8 ${className}`}>
      {messages.map((message) => (
        <motion.div
          key={message.id}
          variants={messageItemVariants}
          initial="initial"
          animate="animate"
        >
          <MessageItem message={message} />
        </motion.div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}