import React from 'react';
import { Shield, Terminal, Database, Settings, ArrowLeft } from 'lucide-react';
import { AdminLogViewer } from './AdminLogViewer';
import { AdminTestPanel } from './AdminTestPanel';
import { AdminEnvViewer } from './AdminEnvViewer';
import { useAuth } from '../../context/AuthContext';
import { ProtectedRoute } from '../auth/ProtectedRoute';
import { useNavigate } from 'react-router-dom';

export function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-[#1A1A1A] text-[#F4F5F1]">
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

          <div className="flex items-center gap-3 mb-8">
            <Terminal className="w-8 h-8 text-[#F46F25]" />
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* System Status */}
            <div className="p-6 bg-[#2A2A2A] rounded-lg border border-[#333333]/30">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-5 h-5 text-[#F46F25]" />
                <h2 className="text-lg font-semibold">System Status</h2>
              </div>
              <AdminTestPanel />
            </div>

            {/* Environment Variables */}
            <div className="p-6 bg-[#2A2A2A] rounded-lg border border-[#333333]/30">
              <div className="flex items-center gap-3 mb-4">
                <Settings className="w-5 h-5 text-[#F46F25]" />
                <h2 className="text-lg font-semibold">Environment Variables</h2>
              </div>
              <AdminEnvViewer />
            </div>

            {/* System Logs */}
            <div className="lg:col-span-2 p-6 bg-[#2A2A2A] rounded-lg border border-[#333333]/30">
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-5 h-5 text-[#F46F25]" />
                <h2 className="text-lg font-semibold">System Logs</h2>
              </div>
              <AdminLogViewer />
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}