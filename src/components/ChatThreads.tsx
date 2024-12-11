import React from 'react';
import { format, isToday, isYesterday, isWithinInterval, subDays } from 'date-fns';
import { useChatStore } from '../store/chatStore';
import { ChatThread } from '../types';
import { ThreadGroup } from './ThreadGroup';
import { ThreadItem } from './ThreadItem';

interface ChatThreadsProps {
  isCollapsed?: boolean;
}

export function ChatThreads({ isCollapsed = false }: ChatThreadsProps) {
  const { threads } = useChatStore();
  const [showArchived, setShowArchived] = React.useState(false);

  // Only show threads that have messages
  const threadsWithMessages = threads.filter(thread => thread.messages.length > 0);

  const groupThreads = (threads: ChatThread[]) => {
    const activeThreads = threads.filter(thread => !thread.isArchived);
    
    const groups = {
      today: activeThreads.filter(thread => isToday(new Date(thread.updatedAt))),
      yesterday: activeThreads.filter(thread => isYesterday(new Date(thread.updatedAt))),
      previousWeek: activeThreads.filter(thread => 
        isWithinInterval(new Date(thread.updatedAt), {
          start: subDays(new Date(), 7),
          end: subDays(new Date(), 2)
        })
      )
    };

    return groups;
  };

  const groupedThreads = groupThreads(threadsWithMessages);
  const hasThreads = threadsWithMessages.length > 0;

  return (
    <div className="flex flex-col h-full">
      {/* Threads List */}
      <div className="flex-1 overflow-y-auto">
        {!isCollapsed ? (
          <>
            {groupedThreads.today.length > 0 && (
              <ThreadGroup title="Today" threads={groupedThreads.today} />
            )}
            {groupedThreads.yesterday.length > 0 && (
              <ThreadGroup title="Yesterday" threads={groupedThreads.yesterday} />
            )}
            {groupedThreads.previousWeek.length > 0 && (
              <ThreadGroup title="Previous 7 Days" threads={groupedThreads.previousWeek} />
            )}
            {!hasThreads && (
              <div className="p-4 text-center text-[#7F7F7F] text-sm">
                No conversations yet
              </div>
            )}
          </>
        ) : (
          <div className="py-4">
            {threadsWithMessages.map(thread => (
              <ThreadItem 
                key={thread.id}
                thread={thread}
                isCollapsed={true}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}