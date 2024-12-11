import React, { useState } from 'react';
import { Bell, ArrowRight, Check } from 'lucide-react';

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setEmail('');
  };

  if (isSubmitted) {
    return (
      <div className="flex items-center gap-4 py-4 text-[#F4F5F1]">
        <div className="p-2 rounded-full bg-green-500/10">
          <Check className="w-5 h-5 text-green-400" />
        </div>
        <p>Thank you! We'll notify you when the platform launches.</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div className="flex items-center gap-3 mb-6">
        <Bell className="w-5 h-5 text-[#F46F25]" />
        <h3 className="text-lg font-medium text-[#F4F5F1]">Stay in the Loop</h3>
      </div>

      <form onSubmit={handleSubmit} className="relative">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.email@company.com"
          className="w-full bg-transparent text-[#F4F5F1] text-lg placeholder-[#7F7F7F] 
                   border-b border-[#333333] pb-3 pr-12
                   focus:outline-none focus:border-[#F46F25]
                   transition-colors"
          required
        />
        <button
          type="submit"
          className="absolute right-0 bottom-3 p-1 text-[#F46F25] 
                   hover:text-[#F46F25]/80 transition-colors
                   focus:outline-none focus:text-[#F46F25]/60"
          aria-label="Subscribe for updates"
        >
          <ArrowRight className="w-5 h-5" />
        </button>
      </form>

      <p className="mt-4 text-sm text-[#7F7F7F]">
        Get notified about monthly sessions and platform updates
      </p>
    </div>
  );
}