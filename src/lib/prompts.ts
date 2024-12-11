import { openai } from './openai';

export async function generateFollowUpQuestions(userQuestion: string): Promise<string[]> {
  if (!openai) {
    throw new Error('OpenAI API key not configured');
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4-turbo-preview",
      messages: [
        {
          role: "system",
          content: `You are a specialized facade access and building maintenance regulatory expert. Generate 5 follow-up questions that:
1. Directly relate to the user's specific query about facade access equipment, window washing systems, or building maintenance
2. Explore deeper technical or compliance aspects of the topic
3. Focus on specific regulatory requirements or safety standards

Format: Return exactly 5 questions, each on a new line, without numbering or prefixes.
Each question should be self-contained and directly related to facade access or building maintenance regulations.`
        },
        {
          role: "user",
          content: `Generate 5 follow-up questions based on this regulatory query:\n\n"${userQuestion}"`
        }
      ],
      temperature: 0.2,
      max_tokens: 250,
      presence_penalty: 0,
      frequency_penalty: 0.5
    });

    const response = completion.choices[0]?.message?.content;
    if (!response) {
      return [];
    }

    // Split response into lines and filter empty lines
    const questions = response
      .split('\n')
      .map(q => q.trim())
      .filter(q => q && !q.startsWith('-') && !q.match(/^\d+\./));

    // Return exactly 5 questions or empty array if invalid
    return questions.length === 5 ? questions : [];

  } catch (error) {
    console.error('Failed to generate follow-up questions:', error);
    return [];
  }
}