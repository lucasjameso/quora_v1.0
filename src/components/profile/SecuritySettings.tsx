import React, { useState } from 'react';
import { Lock, Smartphone, History, Key } from 'lucide-react';

export function SecuritySettings() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const activeSessions = [
    {
      id: '1',
      device: 'Chrome on Windows',
      location: 'New York, US',
      lastActive: new Date()
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      location: 'Los Angeles, US',
      lastActive: new Date()
    }
  ];

  return (
    <div className="bg-[#2A2A2A] rounded-lg border border-[#333333]/30 p-6">
      <div className="flex items-center gap-3 mb-6">
        <Lock className="w-5 h-5 text-[#F46F25]" />
        <h2 className="text-lg font-semibold">Security Settings</h2>
      </div>

      <div className="space-y-6">
        {/* Password Change */}
        <div className="space-y-4">
          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="w-full px-4 py-2 text-left bg-[#333333]/30 rounded-lg hover:bg-[#333333]/50 transition-colors"
          >
            Change Password
          </button>

          {showChangePassword && (
            <form className="space-y-4">
              <input
                type="password"
                placeholder="Current Password"
                className="w-full bg-[#1A1A1A] border border-[#333333]/30 rounded-lg px-4 py-2 text-[#F4F5F1]"
              />
              <input
                type="password"
                placeholder="New Password"
                className="w-full bg-[#1A1A1A] border border-[#333333]/30 rounded-lg px-4 py-2 text-[#F4F5F1]"
              />
              <input
                type="password"
                placeholder="Confirm New Password"
                className="w-full bg-[#1A1A1A] border border-[#333333]/30 rounded-lg px-4 py-2 text-[#F4F5F1]"
              />
              <button
                type="submit"
                className="w-full px-4 py-2 bg-[#F46F25] text-white rounded-lg hover:bg-[#F46F25]/90 transition-colors"
              >
                Update Password
              </button>
            </form>
          )}
        </div>

        {/* Two-Factor Authentication */}
        <div className="flex items-center justify-between p-4 bg-[#333333]/30 rounded-lg">
          <div className="flex items-center gap-3">
            <Smartphone className="w-5 h-5 text-[#F46F25]" />
            <div>
              <h3 className="font-medium">Two-Factor Authentication</h3>
              <p className="text-sm text-[#BFBFBF]">
                Add an extra layer of security to your account
              </p>
            </div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={twoFactorEnabled}
              onChange={() => setTwoFactorEnabled(!twoFactorEnabled)}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-[#333333] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#F46F25]"></div>
          </label>
        </div>

        {/* Active Sessions */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">Active Sessions</h3>
            <button className="text-sm text-[#F46F25] hover:text-[#F46F25]/80">
              Sign out all devices
            </button>
          </div>
          <div className="space-y-2">
            {activeSessions.map((session) => (
              <div
                key={session.id}
                className="flex items-center justify-between p-3 bg-[#333333]/30 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <History className="w-4 h-4 text-[#7F7F7F]" />
                  <div>
                    <p className="text-sm font-medium">{session.device}</p>
                    <p className="text-xs text-[#BFBFBF]">{session.location}</p>
                  </div>
                </div>
                <button className="text-sm text-red-400 hover:text-red-300">
                  Sign out
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* API Keys */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-medium">API Keys</h3>
            <button className="text-sm text-[#F46F25] hover:text-[#F46F25]/80">
              Generate new key
            </button>
          </div>
          <div className="p-4 bg-[#333333]/30 rounded-lg">
            <div className="flex items-center gap-3">
              <Key className="w-5 h-5 text-[#F46F25]" />
              <div>
                <p className="text-sm font-medium">No API keys generated</p>
                <p className="text-xs text-[#BFBFBF]">
                  Generate an API key to access our API
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}