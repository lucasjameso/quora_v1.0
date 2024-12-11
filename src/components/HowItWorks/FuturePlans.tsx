import React from 'react';

interface Plan {
  title: string;
  description: string;
}

interface FuturePlansProps {
  plans: Plan[];
}

export function FuturePlans({ plans }: FuturePlansProps) {
  return (
    <section className="max-w-4xl">
      <h2 className="text-2xl font-semibold text-[#F4F5F1] mb-8">Future Development Plans</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {plans.map((plan, index) => (
          <div 
            key={index}
            className="group"
          >
            <div className="space-y-3">
              <h3 className="text-lg font-medium text-[#F4F5F1] group-hover:text-[#F46F25] transition-colors">
                {plan.title}
              </h3>
              <p className="text-[#BFBFBF]">{plan.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-medium text-[#F4F5F1]">Platform Rollout Reasoning</h3>
        <p className="text-[#BFBFBF] leading-relaxed">
          By launching InnovateHub in phases, we aim to deliver essential compliance resources sooner 
          and refine the platform based on user feedback, improving the user experience as the 
          platform evolves.
        </p>
      </div>
    </section>
  );
}