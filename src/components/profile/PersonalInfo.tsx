import React, { useState } from 'react';
import { User as UserType } from '../../lib/userAuthService';
import { User, Mail, Globe, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

interface PersonalInfoProps {
  user: UserType;
}

export function PersonalInfo({ user }: PersonalInfoProps) {
  const [isEditing, setIsEditing] = useState(false);
  const { updateUser } = useAuth();
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    bio: user.bio || '',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    language: 'en',
    notifications: {
      email: true,
      push: true,
      updates: true
    }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateUser({
        ...user,
        username: formData.username,
        email: formData.email,
        bio: formData.bio
      });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  return (
    <div className="bg-[#2A2A2A] rounded-lg border border-[#333333]/30 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <User className="w-5 h-5 text-[#F46F25]" />
          <h2 className="text-lg font-semibold">Personal Information</h2>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-3 py-1.5 text-sm rounded-lg bg-[#333333]/30 text-[#BFBFBF] hover:bg-[#333333]/50"
        >
          {isEditing ? 'Cancel' : 'Edit'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm text-[#BFBFBF]">Username</label>
          <input
            type="text"
            value={formData.username}
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            disabled={!isEditing}
            className="w-full bg-[#1A1A1A] border border-[#333333]/30 rounded-lg px-4 py-2 text-[#F4F5F1] disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-[#BFBFBF]">Email</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            disabled={!isEditing}
            className="w-full bg-[#1A1A1A] border border-[#333333]/30 rounded-lg px-4 py-2 text-[#F4F5F1] disabled:opacity-50"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm text-[#BFBFBF]">Bio</label>
          <textarea
            value={formData.bio}
            onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
            disabled={!isEditing}
            rows={3}
            className="w-full bg-[#1A1A1A] border border-[#333333]/30 rounded-lg px-4 py-2 text-[#F4F5F1] disabled:opacity-50"
          />
        </div>

        {isEditing && (
          <button
            type="submit"
            className="w-full px-4 py-2 bg-[#F46F25] text-white rounded-lg hover:bg-[#F46F25]/90 transition-colors"
          >
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
}