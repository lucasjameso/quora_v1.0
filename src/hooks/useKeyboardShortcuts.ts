import { useEffect } from 'react';
import { useChatStore } from '../store/chatStore';

export function useKeyboardShortcuts() {
  const { createThread, activeThreadId, threads, deleteThread, archiveThread } = useChatStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + N: New conversation
      if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
        e.preventDefault();
        createThread();
      }

      // Cmd/Ctrl + Delete: Delete current conversation
      if ((e.metaKey || e.ctrlKey) && e.key === 'Delete' && activeThreadId) {
        e.preventDefault();
        if (window.confirm('Are you sure you want to delete this conversation?')) {
          deleteThread(activeThreadId);
        }
      }

      // Cmd/Ctrl + E: Archive current conversation
      if ((e.metaKey || e.ctrlKey) && e.key === 'e' && activeThreadId) {
        e.preventDefault();
        archiveThread(activeThreadId);
      }

      // Cmd/Ctrl + Number: Switch to conversation
      if ((e.metaKey || e.ctrlKey) && !isNaN(parseInt(e.key))) {
        const index = parseInt(e.key) - 1;
        if (index >= 0 && index < threads.length) {
          e.preventDefault();
          const thread = threads[index];
          if (!thread.isArchived) {
            useChatStore.getState().setActiveThread(thread.id);
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeThreadId, threads]);
}