import React from 'react';
import { ArrowLeft, BookOpen, Search, FileText, MessageSquare, Zap } from 'lucide-react';
import { Section } from './Section';
import { FuturePlans } from './FuturePlans';
import { GetStarted } from './GetStarted';

interface HowItWorksProps {
  onBack?: () => void;
}

export function HowItWorks({ onBack }: HowItWorksProps) {
  const sections = [
    {
      id: 'compliance-insights',
      title: 'Compliance Insights',
      icon: Zap,
      overview: 'The Compliance Insights page provides in-depth analysis and ongoing education for the Facade Access Solutions team.',
      features: [
        'Monthly Regulatory Sessions led by John Ho from Engineering',
        'Library of Past Sessions for easy reference',
        'Team-specific insights and interpretations'
      ],
      scenarios: [
        'Team members can get clarity on new OSHA regulations for window washing systems',
        'Team members can reference past sessions to ensure compliance with safety standards'
      ]
    },
    {
      id: 'regulations-library',
      title: 'Regulations Library',
      icon: FileText,
      overview: 'A curated database of regulatory documents specific to construction and facade access industries.',
      features: [
        'Searchable database with advanced filtering',
        'Region-specific regulatory content',
        'Continuous content updates'
      ],
      scenarios: [
        'Team members can verify regional safety requirements for client projects',
        'Team members can reference latest industry regulations for system design'
      ]
    },
    {
      id: 'standards-library',
      title: 'Standards Library',
      icon: BookOpen,
      overview: 'A centralized repository of construction and facade access industry standards.',
      features: [
        'Industry-focused categorization',
        'Best practices documentation',
        'Department-specific views'
      ],
      scenarios: [
        'Team members can review industry standards for accurate project planning',
        'Team members can ensure projects meet quality and safety expectations'
      ]
    },
    {
      id: 'compliance-gpt',
      title: 'ComplianceGPT',
      icon: MessageSquare,
      overview: 'An AI-driven feature for retrieving pertinent regulations, standards, and interpretations.',
      features: [
        'Contextual responses from verified sources',
        'Enhanced prompt feature for refined queries',
        'Document attachment analysis'
      ],
      scenarios: [
        'Team members can get instant answers about specific regulations',
        'Team members can verify project documents against compliance standards'
      ]
    }
  ];

  const futurePlans = [
    {
      title: 'Advanced Search',
      description: 'Enhanced document search and filtering capabilities'
    },
    {
      title: 'Knowledge Sharing',
      description: 'Team collaboration tools for sharing insights'
    },
    {
      title: 'Real-Time Updates',
      description: 'Continuous content updates with role-based notifications'
    }
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-4 mb-8">
            <button
              onClick={onBack}
              className="flex items-center gap-2 px-4 py-2 rounded-lg text-[#F46F25] hover:bg-[#F46F25]/10 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Chat</span>
            </button>
          </div>
          
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold text-[#F4F5F1] mb-4">
              How It Works
            </h1>
            <p className="text-lg text-[#BFBFBF] leading-relaxed">
              Welcome to InnovateHub Compliance Assistant! This guide will walk you through each feature, 
              outlining how our platform can streamline your compliance needs for facade access, exterior 
              building maintenance, and window washing systems.
            </p>
          </div>
        </div>

        {/* Main Sections */}
        <div className="space-y-20">
          {sections.map((section) => (
            <Section
              key={section.id}
              title={section.title}
              overview={section.overview}
              icon={section.icon}
              features={section.features}
              scenarios={section.scenarios}
            />
          ))}

          <FuturePlans plans={futurePlans} />
          <GetStarted onBack={onBack} />
        </div>
      </div>
    </div>
  );
}