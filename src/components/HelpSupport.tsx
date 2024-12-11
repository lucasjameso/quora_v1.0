import React from 'react';
import { Mail, MessageSquare, FileText, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export function HelpSupport() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#1A1A1A] text-[#F4F5F1]">
      <div className="max-w-7xl mx-auto px-6 py-8">
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

        <h1 className="text-3xl font-bold mb-8">Help & Support</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {/* Contact Support */}
          <div className="p-6 bg-[#2A2A2A] rounded-lg border border-[#333333]/30">
            <div className="flex items-center gap-3 mb-4">
              <Mail className="w-5 h-5 text-[#F46F25]" />
              <h2 className="text-xl font-semibold">Contact Support</h2>
            </div>
            <p className="text-[#BFBFBF] mb-4">
              Need assistance? Our support team is here to help.
            </p>
            <a
              href="mailto:lucas.oliver@alimakgroup.com"
              className="inline-flex items-center gap-2 text-[#F46F25] hover:underline"
            >
              lucas.oliver@alimakgroup.com
            </a>
          </div>

          {/* Live Chat */}
          <div className="p-6 bg-[#2A2A2A] rounded-lg border border-[#333333]/30">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-5 h-5 text-[#F46F25]" />
              <h2 className="text-xl font-semibold">Live Chat</h2>
            </div>
            <p className="text-[#BFBFBF] mb-4">
              Chat with our support team in real-time.
            </p>
            <button
              onClick={() => alert('Live chat feature coming soon!')}
              className="px-4 py-2 bg-[#F46F25]/10 text-[#F46F25] rounded-lg hover:bg-[#F46F25]/20 transition-colors"
            >
              Start Chat (Coming Soon)
            </button>
          </div>

          {/* Documentation */}
          <div className="p-6 bg-[#2A2A2A] rounded-lg border border-[#333333]/30">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-[#F46F25]" />
              <h2 className="text-xl font-semibold">Documentation</h2>
            </div>
            <p className="text-[#BFBFBF] mb-4">
              Browse our comprehensive documentation and guides.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-[#7F7F7F]">Documentation coming soon</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="p-6 bg-[#2A2A2A] rounded-lg border border-[#333333]/30">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-[#F46F25]" />
              <h2 className="text-xl font-semibold">FAQ</h2>
            </div>
            <p className="text-[#BFBFBF] mb-4">
              Find answers to commonly asked questions.
            </p>
            <div className="space-y-2">
              <p className="text-sm text-[#7F7F7F]">FAQ content coming soon</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}