import React, { useState } from 'react';
import { Settings, Download, AlertTriangle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function AccountSettings() {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [privacySettings, setPrivacySettings] = useState({
    showOnline: true,
    allowSearch: true,
    showActivity: true
  });
  const navigate = useNavigate();

  const handleExportData = () => {
    // Implement data export functionality
    console.log('Exporting user data...');
  };

  const handleDeleteAccount = () => {
    // Implement account deletion
    console.log('Deleting account...');
  };

  const handlePrivacyChange = (setting: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#F4F5F1]">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/profile')}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#F46F25] hover:bg-[#F46F25]/10 transition-colors mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Profile</span>
          </button>
          
          <div className="flex items-center gap-3">
            <Settings className="w-8 h-8 text-[#F46F25]" />
            <h1 className="text-2xl font-bold">Account Settings</h1>
          </div>
        </div>

        {/* Settings Content */}
        <div className="space-y-6">
          {/* Privacy Settings */}
          <div className="bg-[#2A2A2A] rounded-lg border border-[#333333]/30 p-6">
            <h2 className="text-lg font-semibold mb-4">Privacy Settings</h2>
            <div className="space-y-4">
              <label className="flex items-center justify-between p-3 bg-[#333333]/30 rounded-lg cursor-pointer">
                <div>
                  <span className="text-[#F4F5F1]">Show online status</span>
                  <p className="text-sm text-[#7F7F7F]">Let others see when you're online</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.showOnline}
                  onChange={() => handlePrivacyChange('showOnline')}
                  className="rounded bg-[#1A1A1A] border-[#333333] text-[#F46F25] focus:ring-[#F46F25]"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-[#333333]/30 rounded-lg cursor-pointer">
                <div>
                  <span className="text-[#F4F5F1]">Allow search engines to index profile</span>
                  <p className="text-sm text-[#7F7F7F]">Make your profile discoverable in search results</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.allowSearch}
                  onChange={() => handlePrivacyChange('allowSearch')}
                  className="rounded bg-[#1A1A1A] border-[#333333] text-[#F46F25] focus:ring-[#F46F25]"
                />
              </label>

              <label className="flex items-center justify-between p-3 bg-[#333333]/30 rounded-lg cursor-pointer">
                <div>
                  <span className="text-[#F4F5F1]">Show activity status</span>
                  <p className="text-sm text-[#7F7F7F]">Display your recent activity to others</p>
                </div>
                <input
                  type="checkbox"
                  checked={privacySettings.showActivity}
                  onChange={() => handlePrivacyChange('showActivity')}
                  className="rounded bg-[#1A1A1A] border-[#333333] text-[#F46F25] focus:ring-[#F46F25]"
                />
              </label>
            </div>
          </div>

          {/* Data Export */}
          <div className="bg-[#2A2A2A] rounded-lg border border-[#333333]/30 p-6">
            <h2 className="text-lg font-semibold mb-4">Export Data</h2>
            <div className="flex items-center justify-between p-4 bg-[#333333]/30 rounded-lg">
              <div>
                <p className="text-[#F4F5F1]">Download a copy of your data</p>
                <p className="text-sm text-[#7F7F7F]">Get a copy of all your account information</p>
              </div>
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F46F25]/10 text-[#F46F25] hover:bg-[#F46F25]/20 transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-[#2A2A2A] rounded-lg border border-[#333333]/30 p-6">
            <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              {!showDeleteConfirm ? (
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#F4F5F1]">Delete Account</p>
                    <p className="text-sm text-[#7F7F7F]">Permanently remove your account and all data</p>
                  </div>
                  <button
                    onClick={() => setShowDeleteConfirm(true)}
                    className="px-4 py-2 bg-red-500/10 text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
                  >
                    Delete Account
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-red-400 font-medium">Are you absolutely sure?</p>
                      <p className="text-sm text-red-300 mt-1">
                        This action cannot be undone. This will permanently delete your account and remove all associated data.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleDeleteAccount}
                      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                    >
                      Yes, delete my account
                    </button>
                    <button
                      onClick={() => setShowDeleteConfirm(false)}
                      className="px-4 py-2 bg-[#333333]/30 text-[#BFBFBF] rounded-lg hover:bg-[#333333]/50 transition-colors"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}