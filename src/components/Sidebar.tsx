import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  FileText, 
  HelpCircle, 
  Users, 
  MessageSquarePlus,
  ChevronLeft,
  Menu,
  Search
} from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChatThreads } from './ChatThreads';
import { useChatStore } from '../store/chatStore';
import { Tooltip } from './Tooltip';

interface SidebarProps {
  onNavigate: (view: 'chat' | 'insights' | 'regulations' | 'standards' | 'how-it-works' | 'analytics') => void;
  currentView: string;
}

export function Sidebar({ onNavigate, currentView }: SidebarProps) {
  const { createThread, setActiveThread } = useChatStore();
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleNewChat = () => {
    const newThreadId = createThread();
    setActiveThread(newThreadId);
    navigate('/');
  };

  const handleNavigation = (path: string, view: string) => {
    navigate(path);
    onNavigate(view as any);
  };

  const NavIcon = ({ icon: Icon, label }: { icon: typeof FileText; label: string }) => (
    <Tooltip content={label} side="right" offset={16}>
      <Icon className={`w-5 h-5 text-[#7F7F7F] sidebar-icon ${
        isCollapsed ? 'sidebar-icon-collapsed' : ''
      }`} />
    </Tooltip>
  );

  const navItems = [
    { path: '/insights', view: 'insights', icon: Search, label: 'Compliance Insights' },
    { path: '/regulations', view: 'regulations', icon: FileText, label: 'Regulations Library' },
    { path: '/standards', view: 'standards', icon: BookOpen, label: 'Standards Library' },
    { path: '/how-it-works', view: 'how-it-works', icon: HelpCircle, label: 'How It Works' }
  ];

  return (
    <aside 
      className={`relative bg-[#141414] flex flex-col h-full border-r border-[#333333]/30 
                 sidebar-transition sidebar-glow ${
        isCollapsed ? 'w-[60px]' : 'w-64'
      }`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-3 z-10 p-1.5 rounded-full bg-[#141414] border border-[#333333]/30 
                   hover:bg-[#333333]/30 transition-colors group"
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? (
          <Menu className="w-4 h-4 text-[#7F7F7F] group-hover:text-[#F4F5F1]" />
        ) : (
          <ChevronLeft className="w-4 h-4 text-[#7F7F7F] group-hover:text-[#F4F5F1]" />
        )}
      </button>

      {/* Header */}
      <div className="px-4 py-4">
        <button 
          onClick={() => navigate('/')}
          className="text-lg font-medium text-[#F4F5F1] hover:text-[#F46F25] transition-colors tracking-wide"
        >
          {isCollapsed ? 'Q' : 'Quora'}
        </button>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 flex flex-col">
        <div className="px-2 py-2 space-y-1">
          {navItems.map(({ path, view, icon: Icon, label }) => (
            <button 
              key={path}
              onClick={() => handleNavigation(path, view)}
              className={`nav-item w-full flex items-center ${
                location.pathname === path ? 'active' : ''
              }`}
            >
              {isCollapsed ? (
                <NavIcon icon={Icon} label={label} />
              ) : (
                <>
                  <Icon className="w-5 h-5 text-[#7F7F7F]" />
                  <span className="sidebar-content">
                    {label}
                  </span>
                </>
              )}
            </button>
          ))}
        </div>

        {/* Chat Threads */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0 mt-8">
          <div className="px-3 mb-2 flex items-center justify-between">
            {!isCollapsed && (
              <h2 className="text-xs font-semibold text-[#7F7F7F] uppercase tracking-wider">
                Conversations
              </h2>
            )}
            <div className="relative flex items-center justify-center">
              <button 
                onClick={handleNewChat}
                className="p-1.5 rounded-lg hover:bg-[#333333]/30 text-[#7F7F7F] hover:text-[#F4F5F1] transition-colors"
                aria-label="New Chat"
              >
                {isCollapsed ? (
                  <Tooltip content="New Chat" side="right" offset={16}>
                    <MessageSquarePlus className="w-4 h-4" />
                  </Tooltip>
                ) : (
                  <MessageSquarePlus className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto min-h-0">
            <ChatThreads isCollapsed={isCollapsed} />
          </div>
        </div>

        {/* Bottom Links */}
        <div className="mt-auto">
          <div className="px-2 pb-4">
            <div className="space-y-1">
              <button className="nav-item w-full flex items-center">
                {isCollapsed ? (
                  <NavIcon icon={Users} label="Invite Team" />
                ) : (
                  <>
                    <Users className="w-5 h-5 text-[#7F7F7F]" />
                    <span className="sidebar-content">Invite Team</span>
                  </>
                )}
              </button>
              <button 
                onClick={() => handleNavigation('/analytics', 'analytics')}
                className={`nav-item w-full flex items-center ${
                  location.pathname === '/analytics' ? 'active' : ''
                }`}
              >
                {isCollapsed ? (
                  <NavIcon icon={LayoutDashboard} label="Analytics" />
                ) : (
                  <>
                    <LayoutDashboard className="w-5 h-5 text-[#7F7F7F]" />
                    <span className="sidebar-content">Analytics</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  );
}