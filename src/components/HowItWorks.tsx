import React from 'react';
import { ArrowLeft, BookOpen, Search, FileText, MessageSquare, Zap, ArrowRight } from 'lucide-react';

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
        'Team-specific views'
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
            <section key={section.id} className="relative">
              <div className="max-w-4xl">
                {/* Section Header */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="p-4 rounded-lg bg-[#F46F25]/10">
                    <section.icon className="w-6 h-6 text-[#F46F25]" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-semibold text-[#F4F5F1] mb-3">
                      {section.title}
                    </h2>
                    <p className="text-[#BFBFBF] text-lg leading-relaxed">
                      {section.overview}
                    </p>
                  </div>
                </div>

                {/* Features and Scenarios Grid */}
                <div className="ml-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Key Features */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-medium text-[#F4F5F1]">
                      Key Features
                    </h3>
                    <ul className="space-y-4">
                      {section.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3 group">
                          <div className="w-1.5 h-1.5 rounded-full bg-[#F46F25] mt-2" />
                          <span className="text-[#BFBFBF] group-hover:text-[#F4F5F1] transition-colors">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* User Scenarios */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-medium text-[#F4F5F1]">
                      User Scenarios
                    </h3>
                    <ul className="space-y-6">
                      {section.scenarios.map((scenario, index) => (
                        <li key={index} className="group">
                          <div className="flex items-start gap-4">
                            <div className="flex items-center justify-center w-6 h-6 rounded-full 
                                          bg-[#F46F25]/10 text-[#F46F25] text-sm 
                                          group-hover:bg-[#F46F25]/20 transition-colors">
                              {index + 1}
                            </div>
                            <span className="text-[#BFBFBF] group-hover:text-[#F4F5F1] transition-colors">
                              {scenario}
                            </span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Section Divider */}
                <div className="mt-12 h-px bg-gradient-to-r from-transparent via-[#333333]/50 to-transparent" />
              </div>
            </section>
          ))}

          {/* Future Development */}
          <section className="max-w-4xl">
            <h2 className="text-2xl font-semibold text-[#F4F5F1] mb-8">Future Development Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {futurePlans.map((plan, index) => (
                <div 
                  key={index}
                  className="p-6 rounded-lg bg-[#2A2A2A] border border-[#333333]/30 hover:border-[#F46F25]/20 transition-all duration-300"
                >
                  <h3 className="text-lg font-medium text-[#F4F5F1] mb-3">{plan.title}</h3>
                  <p className="text-[#BFBFBF] text-sm">{plan.description}</p>
                </div>
              ))}
            </div>

            <div className="p-6 rounded-lg bg-[#2A2A2A] border border-[#333333]/30">
              <h3 className="text-lg font-medium text-[#F4F5F1] mb-3">Platform Rollout Reasoning</h3>
              <p className="text-[#BFBFBF]">
                By launching InnovateHub in phases, we aim to deliver essential compliance resources sooner 
                and refine the platform based on user feedback, improving the user experience as the 
                platform evolves.
              </p>
            </div>
          </section>

          {/* Get Started Section */}
          <div className="mt-16 max-w-4xl">
            <div className="p-6 rounded-lg bg-gradient-to-r from-[#F46F25]/20 to-transparent border border-[#F46F25]/20">
              <h2 className="text-xl font-semibold text-[#F4F5F1] mb-4">Ready to Get Started?</h2>
              <p className="text-[#BFBFBF] mb-6">
                Explore InnovateHub's features and stay tuned for more updates as we continue to enhance 
                the platform based on your feedback and needs.
              </p>
              <button 
                onClick={onBack}
                className="flex items-center gap-2 px-6 py-3 rounded-lg bg-[#F46F25] hover:bg-[#F46F25]/90 text-white transition-colors"
              >
                <span>Start Exploring</span>
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}