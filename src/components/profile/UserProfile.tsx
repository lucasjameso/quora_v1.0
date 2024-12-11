import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { ProfileHeader } from './ProfileHeader';
import { PersonalInfo } from './PersonalInfo';
import { SecuritySettings } from './SecuritySettings';
import { RoleManagement } from './RoleManagement';
import { AccountSettings } from './AccountSettings';
import { ProtectedRoute } from '../auth/ProtectedRoute';

export function UserProfile() {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-[#1A1A1A] text-[#F4F5F1] overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Back Button */}
          <div className="mb-6">
            <button
              onClick={() => navigate('/')}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#F46F25] hover:bg-[#F46F25]/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Dashboard</span>
            </button>
          </div>

          <div className="sticky top-0 z-10 bg-[#1A1A1A] pb-4">
            <ProfileHeader user={user} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <PersonalInfo user={user} />
            <SecuritySettings />
            <RoleManagement user={user} />
            <AccountSettings />
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}