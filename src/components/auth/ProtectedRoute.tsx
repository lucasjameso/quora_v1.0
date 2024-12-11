import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Shield } from 'lucide-react';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const { isAuthenticated, isAdmin } = useAuth();

  if (!isAuthenticated || (requireAdmin && !isAdmin)) {
    return (
      <div className="flex items-center justify-center h-screen bg-[#1A1A1A]">
        <div className="p-6 max-w-md w-full bg-[#2A2A2A] rounded-lg border border-[#333333]/30">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-6 h-6 text-red-400" />
            <h2 className="text-xl font-semibold text-[#F4F5F1]">Access Denied</h2>
          </div>
          <p className="text-[#BFBFBF]">
            {!isAuthenticated
              ? "Please sign in to access this area."
              : "You don't have permission to access this area."}
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}