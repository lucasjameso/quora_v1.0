import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { 
  User, 
  Settings, 
  HelpCircle, 
  LogOut,
  ChevronDown,
  Shield
} from 'lucide-react';
import { createPortal } from 'react-dom';

export function UserProfileMenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut } = useAuth();
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  if (!user) return null;

  const menuItems = [
    {
      label: 'View Profile',
      icon: User,
      onClick: () => handleNavigation('/profile')
    },
    {
      label: 'Account Settings',
      icon: Settings,
      onClick: () => handleNavigation('/profile/settings')
    },
    ...(user.role === 'admin' ? [{
      label: 'Admin Dashboard',
      icon: Shield,
      onClick: () => handleNavigation('/admin')
    }] : []),
    {
      label: 'Help & Support',
      icon: HelpCircle,
      onClick: () => handleNavigation('/help')
    }
  ];

  const dropdownContent = isOpen && (
    <div 
      ref={dropdownRef}
      className="fixed bg-[#2A2A2A] rounded-lg border border-[#333333]/30 shadow-xl w-64"
      style={{
        top: buttonRef.current ? buttonRef.current.getBoundingClientRect().bottom + 8 : '4rem',
        right: '1rem',
        zIndex: 999999
      }}
    >
      <div className="p-4 border-b border-[#333333]/30">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full bg-[#F46F25]/10 flex items-center justify-center">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.username}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-6 h-6 text-[#F46F25]" />
            )}
          </div>
          <div>
            <p className="font-medium text-[#F4F5F1]">{user.username}</p>
            <p className="text-sm text-[#7F7F7F]">{user.email}</p>
          </div>
        </div>
      </div>

      <div className="p-2">
        {menuItems.map((item, index) => (
          <button
            key={index}
            onClick={item.onClick}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#333333]/30 text-left transition-colors"
          >
            <item.icon className="w-4 h-4 text-[#7F7F7F]" />
            <span className="text-sm text-[#F4F5F1]">{item.label}</span>
          </button>
        ))}
      </div>

      <div className="p-2 border-t border-[#333333]/30">
        <button 
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-[#333333]/30 text-left transition-colors text-red-400 hover:text-red-300"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <button
        ref={buttonRef}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-2 rounded-lg hover:bg-[#333333]/30 transition-colors"
      >
        <div className="w-8 h-8 rounded-full bg-[#F46F25]/10 flex items-center justify-center">
          {user.profileImage ? (
            <img
              src={user.profileImage}
              alt={user.username}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <span className="text-[#F46F25] font-medium">
              {user.username.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
        <div className="text-left">
          <p className="text-sm font-medium text-[#F4F5F1]">{user.username}</p>
          <p className="text-xs text-[#7F7F7F]">{user.role}</p>
        </div>
        <ChevronDown 
          className={`w-4 h-4 text-[#7F7F7F] transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`} 
        />
      </button>
      {createPortal(dropdownContent, document.body)}
    </>
  );
}