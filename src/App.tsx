import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { HomePage } from './components/HomePage';
import { ComplianceInsights } from './components/ComplianceInsights';
import { RegulationsLibrary } from './components/RegulationsLibrary';
import { StandardsLibrary } from './components/StandardsLibrary';
import { HelpSupport } from './components/HelpSupport';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UserProfile } from './components/profile/UserProfile';
import { AccountSettings } from './components/profile/AccountSettings';
import { ConfigurationGuide } from './components/setup/ConfigurationGuide';
import { Sidebar } from './components/Sidebar';
import { UserProfileMenuButton } from './components/UserProfileMenuButton';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <div className="flex h-screen bg-[#1A1A1A]">
          <Sidebar />
          <main className="flex-1 overflow-y-auto">
            <div className="absolute top-4 right-4 z-10">
              <UserProfileMenuButton />
            </div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/compliance" element={<ComplianceInsights />} />
              <Route path="/regulations" element={<RegulationsLibrary />} />
              <Route path="/standards" element={<StandardsLibrary />} />
              <Route path="/help" element={<HelpSupport />} />
              <Route path="/admin" element={<AdminDashboard />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/profile/settings" element={<AccountSettings />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>
        </div>
        <ConfigurationGuide />
      </AuthProvider>
    </ThemeProvider>
  );
}