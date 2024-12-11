export interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  attachment?: File;
  isError?: boolean;
  isTyping?: boolean;
}

export interface ChatThread {
  id: string;
  title: string;
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
  openAIThreadId?: string;
}

export interface ChatStore {
  threads: ChatThread[];
  activeThreadId: string | null;
  setActiveThread: (threadId: string) => void;
  createThread: () => string;
  addMessage: (threadId: string, message: Message) => Promise<void>;
  updateThread: (threadId: string, updates: Partial<ChatThread>) => void;
  deleteThread: (threadId: string) => void;
  archiveThread: (threadId: string) => void;
}