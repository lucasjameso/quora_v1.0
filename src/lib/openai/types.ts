export interface AssistantMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface AssistantThread {
  id: string;
  messages: AssistantMessage[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AssistantResponse {
  message: string;
  threadId: string;
  success: boolean;
  error?: string;
}