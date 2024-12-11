import React from 'react';
import { LogIn, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface AuthButtonProps {
  onSignInClick: () => void;
}

export function AuthButton({ onSignInClick }: AuthButtonProps) {
  const { isAuthenticated, user, signOut } = useAuth();

  if (isAuthenticated && user) {
    return (
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#F46F25]/10 flex items-center justify-center">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.username}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <div className="w-full h-full rounded-full bg-[#F46F25] flex items-center justify-center text-white font-medium">
                {user.username.charAt(0).toUpperCase()}
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-[#F4F5F1]">{user.username}</span>
            <span className="text-xs text-[#7F7F7F]">{user.role}</span>
          </div>
        </div>
        <button
          onClick={signOut}
          className="p-2 rounded-lg hover:bg-[#333333]/30 transition-colors"
          title="Sign Out"
        >
          <LogOut className="w-4 h-4 text-[#7F7F7F] hover:text-[#F4F5F1]" />
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={onSignInClick}
      className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F46F25] hover:bg-[#F46F25]/90 text-white transition-colors"
    >
      <LogIn className="w-4 h-4" />
      <span>Sign In</span>
    </button>
  );
}