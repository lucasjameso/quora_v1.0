import React from 'react';
import { format } from 'date-fns';
import { Edit2, MessageSquare, Share2, Trash2, Archive } from 'lucide-react';
import { useChatStore } from '../store/chatStore';
import { ChatThread } from '../types';

interface ThreadItemProps {
  thread: ChatThread;
  isCollapsed?: boolean;
}

export function ThreadItem({ thread, isCollapsed = false }: ThreadItemProps) {
  const { activeThreadId, setActiveThread, updateThread, deleteThread, archiveThread } = useChatStore();
  const [isEditing, setIsEditing] = React.useState(false);

  const handleTitleEdit = (newTitle: string) => {
    updateThread(thread.id, { title: newTitle.trim() || 'New Chat' });
    setIsEditing(false);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this chat?')) {
      deleteThread(thread.id);
    }
  };

  if (isCollapsed) {
    return (
      <div
        onClick={() => setActiveThread(thread.id)}
        className={`px-4 py-3 cursor-pointer ${
          thread.id === activeThreadId ? 'bg-[#333333]/30' : 'hover:bg-[#333333]/20'
        }`}
      >
        <MessageSquare className="w-5 h-5 text-[#7F7F7F]" />
      </div>
    );
  }

  return (
    <div
      onClick={() => setActiveThread(thread.id)}
      className={`group px-4 py-3 cursor-pointer ${
        thread.id === activeThreadId ? 'bg-[#333333]/30' : 'hover:bg-[#333333]/20'
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          {isEditing ? (
            <input
              autoFocus
              defaultValue={thread.title}
              onBlur={(e) => handleTitleEdit(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleTitleEdit(e.currentTarget.value);
                if (e.key === 'Escape') setIsEditing(false);
              }}
              onClick={(e) => e.stopPropagation()}
              className="w-full bg-transparent text-[#F4F5F1] focus:outline-none text-sm"
            />
          ) : (
            <h4 className="text-sm font-medium text-[#F4F5F1] truncate">
              {thread.title}
            </h4>
          )}
          
          <div className="flex items-center gap-2 mt-1">
            <MessageSquare className="w-3 h-3 text-[#7F7F7F]" />
            <span className="text-xs text-[#7F7F7F]">
              {thread.messages.length}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsEditing(true);
            }}
            className="p-1 rounded hover:bg-[#333333]/30"
          >
            <Edit2 className="w-4 h-4 text-[#7F7F7F]" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              const url = `${window.location.origin}/chat/${thread.id}`;
              navigator.clipboard.writeText(url);
            }}
            className="p-1 rounded hover:bg-[#333333]/30"
          >
            <Share2 className="w-4 h-4 text-[#7F7F7F]" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              archiveThread(thread.id);
            }}
            className="p-1 rounded hover:bg-[#333333]/30"
          >
            <Archive className="w-4 h-4 text-[#7F7F7F]" />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-[#333333]/30"
          >
            <Trash2 className="w-4 h-4 text-[#7F7F7F]" />
          </button>
        </div>
      </div>
    </div>
  );
}