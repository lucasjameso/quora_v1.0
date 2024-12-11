import React from 'react';
import { Shield, Users, ArrowUpRight } from 'lucide-react';
import { User as UserType } from '../../lib/userAuthService';

interface RoleManagementProps {
  user: UserType;
}

export function RoleManagement({ user }: RoleManagementProps) {
  const rolePermissions = {
    user: [
      'Access to basic features',
      'Create and manage personal content',
      'Participate in discussions'
    ],
    admin: [
      'Full system access',
      'User management',
      'Content moderation',
      'System configuration'
    ]
  };

  const canRequestUpgrade = user.role === 'user';

  return (
    <div className="bg-[#2A2A2A] rounded-lg border border-[#333333]/30 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Shield className="w-5 h-5 text-[#F46F25]" />
        <h2 className="text-lg font-semibold">Role & Permissions</h2>
      </div>

      <div className="space-y-6">
        {/* Current Role */}
        <div className="p-4 bg-[#333333]/30 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-[#F46F25]" />
              <div>
                <h3 className="font-medium">Current Role</h3>
                <p className="text-sm text-[#BFBFBF]">Your account type and level</p>
              </div>
            </div>
            <span className="px-3 py-1 text-sm rounded-full bg-[#F46F25]/10 text-[#F46F25]">
              {user.role}
            </span>
          </div>

          <div className="space-y-2">
            <h4 className="text-sm font-medium text-[#BFBFBF]">Permissions:</h4>
            <ul className="space-y-2">
              {rolePermissions[user.role === 'admin' ? 'admin' : 'user'].map((permission, index) => (
                <li key={index} className="flex items-center gap-2 text-sm text-[#F4F5F1]">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#F46F25]" />
                  {permission}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Team/Organization Affiliations */}
        <div className="p-4 bg-[#333333]/30 rounded-lg">
          <h3 className="font-medium mb-4">Team Affiliations</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-[#1A1A1A] rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#F46F25]/10 flex items-center justify-center">
                  <Users className="w-4 h-4 text-[#F46F25]" />
                </div>
                <div>
                  <p className="font-medium">Development Team</p>
                  <p className="text-sm text-[#BFBFBF]">Active Member</p>
                </div>
              </div>
              <button className="p-2 rounded-lg hover:bg-[#333333]/30">
                <ArrowUpRight className="w-4 h-4 text-[#F46F25]" />
              </button>
            </div>
          </div>
        </div>

        {/* Role Upgrade Request */}
        {canRequestUpgrade && (
          <div className="p-4 bg-[#333333]/30 rounded-lg">
            <h3 className="font-medium mb-2">Want more access?</h3>
            <p className="text-sm text-[#BFBFBF] mb-4">
              Request an upgrade to access additional features and permissions
            </p>
            <button className="w-full px-4 py-2 bg-[#F46F25] text-white rounded-lg hover:bg-[#F46F25]/90 transition-colors">
              Request Role Upgrade
            </button>
          </div>
        )}
      </div>
    </div>
  );
}