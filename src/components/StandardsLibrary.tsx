import React from 'react';
import { ArrowLeft, Search, Globe, Filter, Clock, BookOpen, Shield, FileCheck } from 'lucide-react';
import { FeatureCard } from './ComingSoon/FeatureCard';
import { NewsletterSignup } from './ComingSoon/NewsletterSignup';
import { Timeline } from './ComingSoon/Timeline';

interface StandardsLibraryProps {
  onBack?: () => void;
}

export function StandardsLibrary({ onBack }: StandardsLibraryProps) {
  const features = [
    {
      icon: Shield,
      title: 'Industry Standards',
      description: 'Access comprehensive standards for facade access, maintenance, and safety systems.'
    },
    {
      icon: FileCheck,
      title: 'Best Practices',
      description: 'Reference curated best practices and compliance benchmarks for project excellence.'
    },
    {
      icon: Filter,
      title: 'Department-Specific Views',
      description: 'Customized access for Estimating, Sales, Project Management, and Engineering teams.'
    },
    {
      icon: Clock,
      title: 'Standards Updates',
      description: 'Stay informed about industry standard revisions and new safety requirements.'
    }
  ];

  const timelineItems = [
    {
      date: 'Oct 19, 2024',
      title: 'Standards Collection',
      status: 'completed' as const,
      details: [
        { text: 'Gather industry standards' },
        { text: 'Organize by category' },
        { text: 'Validate current versions' }
      ]
    },
    {
      date: 'Nov 25, 2024',
      title: 'Content Structure',
      status: 'completed' as const,
      details: [
        { text: 'Create standards database' },
        { text: 'Implement categorization' },
        { text: 'Set up version control' }
      ]
    },
    {
      date: 'Dec 15, 2024',
      title: 'Department Review',
      status: 'current' as const,
      details: [
        { text: 'Team feedback sessions' },
        { text: 'Content refinements' },
        { text: 'Access optimization' }
      ]
    },
    {
      date: 'Jan 10, 2025',
      title: 'Final Validation',
      status: 'upcoming' as const,
      details: [
        { text: 'Standards verification' },
        { text: 'System testing' },
        { text: 'User acceptance' }
      ]
    },
    {
      date: 'Jan 20, 2025',
      title: 'Library Launch',
      status: 'upcoming' as const,
      details: [
        { text: 'Full deployment' },
        { text: 'Team training' },
        { text: 'Support activation' }
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
              Standards Library
            </h1>
            <p className="text-[#BFBFBF] text-lg leading-relaxed">
              A curated collection of industry standards, best practices, and compliance benchmarks 
              for facade access and construction compliance. Launch expected on January 20, 2025.
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
                Preview: Standards Library
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl">
              {['Safety Standards', 'Industry Best Practices'].map((type) => (
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
            Deliver a structured repository of industry standards, empowering our team with reliable 
            guidance for maintaining excellence in safety and regulatory compliance. Through organized, 
            accessible content, we aim to enhance project quality and safety across all departments.
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