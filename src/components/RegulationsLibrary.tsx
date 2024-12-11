import React from 'react';
import { ArrowLeft, Search, Globe, Filter, Clock, BookOpen } from 'lucide-react';
import { FeatureCard } from './ComingSoon/FeatureCard';
import { NewsletterSignup } from './ComingSoon/NewsletterSignup';
import { Timeline } from './ComingSoon/Timeline';

interface RegulationsLibraryProps {
  onBack?: () => void;
}

export function RegulationsLibrary({ onBack }: RegulationsLibraryProps) {
  const features = [
    {
      icon: Globe,
      title: 'Region-Specific Content',
      description: 'Access regulations organized by jurisdiction, ensuring compliance with local requirements.'
    },
    {
      icon: Search,
      title: 'Smart Search',
      description: 'Quickly find relevant regulations with advanced search and filtering capabilities.'
    },
    {
      icon: Filter,
      title: 'Department Filters',
      description: "View regulations tailored to your department's needs - Estimating, Sales, PM, or Engineering."
    },
    {
      icon: Clock,
      title: 'Real-Time Updates',
      description: 'Stay current with automatic updates when regulations change or new requirements are introduced.'
    }
  ];

  const timelineItems = [
    {
      date: 'Oct 19, 2024',
      title: 'Content Collection',
      status: 'completed' as const,
      details: [
        { text: 'Gather regulatory documents' },
        { text: 'Organize by jurisdiction' },
        { text: 'Validate content accuracy' }
      ]
    },
    {
      date: 'Nov 25, 2024',
      title: 'Database Setup',
      status: 'completed' as const,
      details: [
        { text: 'Create searchable database' },
        { text: 'Implement filtering system' },
        { text: 'Set up update protocols' }
      ]
    },
    {
      date: 'Dec 15, 2024',
      title: 'User Testing',
      status: 'current' as const,
      details: [
        { text: 'Department feedback sessions' },
        { text: 'Interface refinements' },
        { text: 'Search optimization' }
      ]
    },
    {
      date: 'Jan 10, 2025',
      title: 'Final Review',
      status: 'upcoming' as const,
      details: [
        { text: 'Content verification' },
        { text: 'System performance checks' },
        { text: 'User access testing' }
      ]
    },
    {
      date: 'Jan 20, 2025',
      title: 'Library Launch',
      status: 'upcoming' as const,
      details: [
        { text: 'Full system deployment' },
        { text: 'Team onboarding' },
        { text: 'Support system activation' }
      ]
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header with Back Button */}
        <div className="mb-12">
          <div className="flex items-center gap-4 mb-6">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#F46F25] hover:bg-[#F46F25]/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Chat</span>
            </button>
          </div>
          
          <div className="max-w-2xl">
            <div className="inline-block px-4 py-1.5 rounded-full bg-[#F46F25]/10 text-[#F46F25] text-sm font-medium mb-4">
              Coming Soon
            </div>
            <h1 className="text-4xl font-bold text-[#F4F5F1] mb-4">
              Regulations Library
            </h1>
            <p className="text-[#BFBFBF] text-lg leading-relaxed">
              A comprehensive hub for facade access regulations and compliance documentation. 
              Designed for quick access to essential regulatory information across all departments. 
              Launch expected on January 20, 2025.
            </p>
          </div>
        </div>

        {/* Preview Card */}
        <div className="mb-12 relative overflow-hidden rounded-xl border border-[#333333]/30">
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A1A1A] to-transparent z-10" />
          <div className="relative z-20 p-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-[#F46F25]/10">
                <BookOpen className="w-6 h-6 text-[#F46F25]" />
              </div>
              <h2 className="text-xl font-semibold text-[#F4F5F1]">
                Preview: Regulations Library
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {['Federal Regulations', 'State & Local Codes'].map((type) => (
                <div key={type} className="p-4 rounded-lg bg-[#2A2A2A]/50 border border-[#333333]/30">
                  <h3 className="text-[#F4F5F1] font-medium mb-2">{type}</h3>
                  <div className="space-y-2">
                    <div className="h-2 bg-[#333333]/50 rounded w-3/4" />
                    <div className="h-2 bg-[#333333]/50 rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mb-12 p-6 rounded-xl bg-[#2A2A2A] border border-[#333333]/30">
          <h2 className="text-xl font-semibold text-[#F4F5F1] mb-3">Our Vision</h2>
          <p className="text-[#BFBFBF] leading-relaxed">
            Equip team members with quick, reliable access to crucial regulations, 
            empowering informed decision-making and adherence to regulatory requirements. 
            Through organized, searchable content, we aim to streamline compliance 
            processes across all departments.
          </p>
        </div>

        {/* Timeline Section */}
        <div className="mb-16">
          <h2 className="text-xl font-semibold text-[#F4F5F1] mb-8">Development Timeline</h2>
          <div className="hidden md:block">
            <Timeline items={timelineItems} />
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="max-w-2xl py-8">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
}