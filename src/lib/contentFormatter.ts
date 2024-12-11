import { BRAND_COLORS } from './constants';

export function formatContent(content: string): string {
  // Remove the first set of Related Questions if they appear before the final section
  const sections = content.split(/(?=###\s)/).filter(Boolean);
  
  // Filter out any Related Questions section that isn't the last one
  const formattedSections = sections.filter((section, index) => {
    const isRelatedQuestions = section.includes('Related Questions');
    const isLastSection = index === sections.length - 1;
    return !isRelatedQuestions || isLastSection;
  });

  // Format source citations in orange
  const formattedContent = formattedSections.map(section => {
    if (section.includes('### Sources')) {
      // Add orange color to source citations
      return section.replace(
        /•\s+([^•\n]+)/g,
        `• <span style="color: ${BRAND_COLORS.orange}">$1</span>`
      );
    }
    return section;
  }).join('\n\n');

  return formattedContent;
}

export function formatRelatedQuestions(questions: string[]): string[] {
  // Ensure we have exactly 5 questions
  const formattedQuestions = questions
    .slice(0, 5)
    .map(q => q.trim())
    .filter(q => q.length > 0);

  // Pad with default questions if needed
  while (formattedQuestions.length < 5) {
    formattedQuestions.push(
      "What are the latest safety requirements for facade access equipment?",
      "How do OSHA regulations apply to window washing systems?",
      "What are the maintenance requirements for suspended platforms?",
      "What are the inspection requirements for tieback anchors?",
      "What are the emergency procedures for suspended scaffold operations?"
    );
  }

  return formattedQuestions.slice(0, 5);
}