import OpenAI from 'openai';
import { config } from '../config';

const ASSISTANT_ID = 'asst_kAZ3qsSeH37QvOoreLCZyV4Q';

class AssistantManager {
  private openai: OpenAI;
  private assistant: OpenAI.Beta.Assistant | null = null;

  constructor() {
    this.openai = new OpenAI({
      apiKey: config.openai.apiKey,
      dangerouslyAllowBrowser: true
    });
  }

  async initialize() {
    try {
      this.assistant = await this.openai.beta.assistants.retrieve(ASSISTANT_ID);
      console.log('Assistant initialized:', this.assistant.name);
      return true;
    } catch (error) {
      console.error('Failed to initialize assistant:', error);
      throw new Error('Failed to initialize OpenAI Assistant');
    }
  }

  async createThread() {
    try {
      const thread = await this.openai.beta.threads.create();
      return thread.id;
    } catch (error) {
      console.error('Failed to create thread:', error);
      throw new Error('Failed to create conversation thread');
    }
  }

  async sendMessage(threadId: string, content: string) {
    try {
      // Add the message to the thread
      await this.openai.beta.threads.messages.create(threadId, {
        role: 'user',
        content
      });

      // Run the assistant with the specified model
      const run = await this.openai.beta.threads.runs.create(threadId, {
        assistant_id: ASSISTANT_ID,
        model: config.openai.model
      });

      // Wait for completion
      const completion = await this.waitForCompletion(threadId, run.id);
      
      // Get the messages after completion
      const messages = await this.openai.beta.threads.messages.list(threadId);
      
      // Return the latest assistant message
      const latestMessage = messages.data
        .filter(msg => msg.role === 'assistant')
        .shift();

      if (!latestMessage?.content[0]?.text?.value) {
        throw new Error('No response generated');
      }

      return latestMessage.content[0].text.value;
    } catch (error) {
      console.error('Failed to send message:', error);
      throw error;
    }
  }

  private async waitForCompletion(threadId: string, runId: string) {
    let run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
    
    while (run.status === 'queued' || run.status === 'in_progress') {
      await new Promise(resolve => setTimeout(resolve, 1000));
      run = await this.openai.beta.threads.runs.retrieve(threadId, runId);
    }

    if (run.status === 'failed') {
      throw new Error('Assistant run failed');
    }

    return run;
  }
}

// Export singleton instance
export const assistantManager = new AssistantManager();