import React from 'react';
import { User, Upload } from 'lucide-react';
import { User as UserType } from '../../lib/userAuthService';

interface ProfileHeaderProps {
  user: UserType;
}

export function ProfileHeader({ user }: ProfileHeaderProps) {
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Handle image upload
      console.log('Uploading image:', file);
    }
  };

  return (
    <div className="bg-[#2A2A2A] rounded-lg border border-[#333333]/30 p-6">
      <div className="flex items-center gap-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-[#333333] flex items-center justify-center">
            {user.profileImage ? (
              <img
                src={user.profileImage}
                alt={user.username}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-[#7F7F7F]" />
            )}
          </div>
          <label className="absolute bottom-0 right-0 p-2 rounded-full bg-[#F46F25] cursor-pointer hover:bg-[#F46F25]/90 transition-colors">
            <Upload className="w-4 h-4 text-white" />
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
            />
          </label>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[#F4F5F1]">{user.username}</h1>
          <p className="text-[#BFBFBF]">{user.email}</p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2 py-1 text-xs rounded-full bg-[#F46F25]/10 text-[#F46F25]">
              {user.role}
            </span>
            <span className="text-sm text-[#7F7F7F]">
              Member since {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}