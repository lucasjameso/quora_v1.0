import React, { useState } from 'react';
import { ChatInput } from '../ChatInput';
import { MessageList } from './MessageList';
import { motion, AnimatePresence } from 'framer-motion';
import { useChatStore } from '../../store/chatStore';
import { welcomeScreenVariants, messageContainerVariants } from './animations';

export function ChatContainer() {
  const [hasMessages, setHasMessages] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { addMessage, activeThreadId, createThread, threads } = useChatStore();

  const handleSendMessage = async (message: string, file?: File) => {
    let threadId = activeThreadId;
    
    // Create new thread if none exists
    if (!threadId) {
      threadId = createThread();
    }
    
    if (!message.trim() && !file) return;
    
    setIsProcessing(true);
    setHasMessages(true);
    
    try {
      await addMessage(threadId, {
        id: `msg-${Date.now()}`,
        content: message,
        sender: 'user',
        timestamp: new Date(),
        attachment: file
      });
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  // Set hasMessages based on existing threads
  React.useEffect(() => {
    if (threads.some(thread => thread.messages.length > 0)) {
      setHasMessages(true);
    }
  }, [threads]);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1A1A1A] relative overflow-hidden">
      <AnimatePresence mode="wait">
        {!hasMessages ? (
          <motion.div
            key="welcome"
            variants={welcomeScreenVariants}
            initial="initial"
            exit="exit"
            className="flex-1 flex items-center justify-center p-6"
          >
            <div className="text-center space-y-6 max-w-2xl">
              <h1 className="text-4xl font-bold text-[#F4F5F1]">
                QUORA
              </h1>
              <div className="divider-pulse w-1/2 mx-auto" />
              <h2 className="text-3xl font-bold text-[#F4F5F1]">
                Compliance Assistant
              </h2>
              <p className="text-lg text-[#BFBFBF]">
                Ask questions about facade access equipment, window washing systems, and
                building maintenance regulations.
              </p>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="chat"
            variants={messageContainerVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex-1 flex flex-col"
          >
            <div className="flex-1 overflow-y-auto">
              <MessageList />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="sticky bottom-0 left-0 right-0 z-10">
        <div className="bg-gradient-to-t from-[#1A1A1A] to-transparent pt-6 pb-4">
          <ChatInput
            onSend={handleSendMessage}
            isProcessing={isProcessing}
            placeholder="Ask about regulations..."
          />
        </div>
      </div>
    </div>
  );
}