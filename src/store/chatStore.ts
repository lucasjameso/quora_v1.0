import { create } from 'zustand';
import { ChatStore, ChatThread, Message } from '../types';
import { assistantManager } from '../lib/openai/assistant';

let nextId = 1;
const generateId = () => `thread-${nextId++}`;

export const useChatStore = create<ChatStore>((set, get) => ({
  threads: [],
  activeThreadId: null,

  setActiveThread: (threadId) => {
    set({ activeThreadId: threadId });
  },

  createThread: () => {
    const newThread: ChatThread = {
      id: generateId(),
      title: 'New Chat',
      messages: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      isArchived: false
    };

    set((state) => ({
      threads: [newThread, ...state.threads],
      activeThreadId: newThread.id
    }));

    return newThread.id;
  },

  addMessage: async (threadId, message) => {
    const thread = get().threads.find(t => t.id === threadId);
    
    // Add user message
    set((state) => ({
      threads: state.threads.map((t) =>
        t.id === threadId
          ? {
              ...t,
              messages: [...t.messages, message],
              updatedAt: new Date(),
              title: t.messages.length === 0 
                ? message.content.slice(0, 30) + '...' 
                : t.title
            }
          : t
      )
    }));

    // Only process AI response for user messages
    if (message.sender === 'user') {
      // Show typing indicator
      const typingMessage: Message = {
        id: `typing-${Date.now()}`,
        content: '',
        sender: 'bot',
        timestamp: new Date(),
        isTyping: true
      };

      set((state) => ({
        threads: state.threads.map((t) =>
          t.id === threadId
            ? {
                ...t,
                messages: [...t.messages, typingMessage],
                updatedAt: new Date()
              }
            : t
        )
      }));

      try {
        // Create OpenAI thread if needed
        let openAIThreadId = thread?.openAIThreadId;
        if (!openAIThreadId) {
          openAIThreadId = await assistantManager.createThread();
          // Store the OpenAI thread ID
          set((state) => ({
            threads: state.threads.map((t) =>
              t.id === threadId
                ? { ...t, openAIThreadId }
                : t
            )
          }));
        }

        // Get response from OpenAI Assistant
        const response = await assistantManager.sendMessage(openAIThreadId, message.content);

        // Remove typing indicator and add response
        set((state) => ({
          threads: state.threads.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  messages: [
                    ...t.messages.filter(msg => !msg.isTyping),
                    {
                      id: `msg-${Date.now()}`,
                      content: response,
                      sender: 'bot',
                      timestamp: new Date()
                    }
                  ],
                  updatedAt: new Date()
                }
              : t
          )
        }));
      } catch (error) {
        // Remove typing indicator and add error message
        set((state) => ({
          threads: state.threads.map((t) =>
            t.id === threadId
              ? {
                  ...t,
                  messages: [
                    ...t.messages.filter(msg => !msg.isTyping),
                    {
                      id: `msg-${Date.now()}`,
                      content: error instanceof Error ? error.message : 'An error occurred',
                      sender: 'bot',
                      timestamp: new Date(),
                      isError: true
                    }
                  ],
                  updatedAt: new Date()
                }
              : t
          )
        }));
      }
    }
  },

  updateThread: (threadId, updates) => {
    set((state) => ({
      threads: state.threads.map((thread) =>
        thread.id === threadId ? { ...thread, ...updates, updatedAt: new Date() } : thread
      )
    }));
  },

  deleteThread: (threadId) => {
    set((state) => ({
      threads: state.threads.filter((thread) => thread.id !== threadId),
      activeThreadId: state.activeThreadId === threadId 
        ? (state.threads[0]?.id || null)
        : state.activeThreadId
    }));
  },

  archiveThread: (threadId) => {
    set((state) => ({
      threads: state.threads.map((thread) =>
        thread.id === threadId ? { ...thread, isArchived: true } : thread
      )
    }));
  }
}));