import React from 'react';
import { ArrowLeft, BookOpen, Users, Calendar, Zap } from 'lucide-react';
import { FeatureCard } from './ComingSoon/FeatureCard';
import { NewsletterSignup } from './ComingSoon/NewsletterSignup';
import { Timeline } from './ComingSoon/Timeline';

interface ComplianceInsightsProps {
  onBack?: () => void;
}

export function ComplianceInsights({ onBack }: ComplianceInsightsProps) {
  const features = [
    {
      icon: Calendar,
      title: 'Monthly Expert Sessions',
      description: 'Regular sessions led by John Ho from Engineering, covering critical regulations and standards in facade access solutions.'
    },
    {
      icon: BookOpen,
      title: 'Curated Knowledge Library',
      description: 'Access a comprehensive library of past sessions, engineering insights, and compliance interpretations.'
    },
    {
      icon: Users,
      title: 'Team-Specific Insights',
      description: 'Tailored content for Estimating, Sales, Project Management, and Engineering teams within Facade Access Solutions.'
    },
    {
      icon: Zap,
      title: 'Expert-Led Updates',
      description: 'Stay current with the latest regulatory changes and internal interpretations, curated by our compliance expert.'
    }
  ];

  const timelineItems = [
    {
      date: 'Oct 19, 2024',
      title: 'Content Development',
      status: 'completed' as const,
      details: [
        { text: 'Create foundational content' },
        { text: 'Establish strategic documentation' },
        { text: 'Set project direction' }
      ]
    },
    {
      date: 'Nov 25, 2024',
      title: 'Beta Development',
      status: 'completed' as const,
      details: [
        { text: 'Launch beta version' },
        { text: 'Collect user feedback' },
        { text: 'Implement platform refinements' }
      ]
    },
    {
      date: 'Dec 1, 2024',
      title: 'Stakeholder Review',
      status: 'current' as const,
      details: [
        { text: 'Present to stakeholders' },
        { text: 'Align with strategic goals' },
        { text: 'Process feedback and adjustments' }
      ]
    },
    {
      date: 'Dec 10, 2024',
      title: 'Quality Assurance',
      status: 'upcoming' as const,
      details: [
        { text: 'Run comprehensive testing' },
        { text: 'Verify platform stability' },
        { text: 'Ensure optimal performance' }
      ]
    },
    {
      date: 'Dec 25, 2024',
      title: 'Platform Launch',
      status: 'upcoming' as const,
      details: [
        { text: 'Release InnovateHub' },
        { text: 'Complete development phase' },
        { text: 'Begin production operations' }
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
              Facade Access Compliance Insights
            </h1>
            <p className="text-[#BFBFBF] text-lg leading-relaxed">
              Specialized compliance insights tailored for Facade Access Solutions teams. 
              Enhance your understanding of regulatory requirements through expert-led sessions 
              and comprehensive resources. Launch expected on December 25, 2024.
            </p>
          </div>
        </div>

        {/* Vision Statement */}
        <div className="mb-12 p-6 rounded-xl bg-[#2A2A2A] border border-[#333333]/30">
          <h2 className="text-xl font-semibold text-[#F4F5F1] mb-3">Our Vision</h2>
          <p className="text-[#BFBFBF] leading-relaxed">
            To provide structured, ongoing compliance education, strengthening the entire team's 
            understanding of regulatory intricacies in facade access. Through expert-led sessions 
            and comprehensive resources, we aim to foster compliance excellence across all departments.
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