import { Course } from '../types';

export const courses: Course[] = [
  {
    id: 'ai-soup-to-nuts',
    slug: 'ai-soup-to-nuts',
    title: 'AI Soup to Nuts',
    subtitle: 'A practical, non-technical guide to understanding and using AI',
    shortDescription: 'A practical, non-technical introduction to AI that takes participants from the fundamentals through practical, real-world use.',
    longDescription: 'This course is designed for people who want to understand AI and use it effectively without needing a programming or technical background. You will learn the foundations of Artificial Intelligence, how modern generative models function, and how to harness tools like ChatGPT for everyday business productivity, research, analysis, and automation. We will also address critical risk, privacy, and security considerations to ensure you use AI responsibly.',
    audience: [
      'Business professionals looking to adapt to the AI era',
      'Managers and team leaders who want to leverage AI workflows',
      'Executives and entrepreneurs driving strategic initiatives',
      'Consultants, educators, and administrative professionals',
      'Anyone curious about AI who wants practical skills without learning to code'
    ],
    learningOutcomes: [
      'Understand what AI is and how Large Language Models work at a high level',
      'Master prompt engineering to get reliable, high-quality answers',
      'Boost personal productivity for writing, editing, brainstorming, and organizing',
      'Conduct research, synthesize documents, and analyze complex information',
      'Create custom workflows using generative images and AI agents',
      'Navigate risks including AI hallucinations, privacy limitations, and security policies',
      'Establish a practical roadmap for continuous learning after the course'
    ],
    outline: [
      {
        title: 'Day 1: AI Fundamentals & Prompt Engineering',
        items: [
          'What AI actually is: De-hyping artificial intelligence',
          'How modern AI works at a high level: Generative models and neural networks',
          'Overview of the AI landscape: ChatGPT, Claude, Gemini, and local models',
          'Communicating with AI: The core principles of prompt engineering',
          'Everyday productivity: Writing assistance, editing, and planning',
          'Collaborative brainstorming: Using AI as a thought partner'
        ]
      },
      {
        title: 'Day 2: AI at Work, Security & Practical Workflows',
        items: [
          'AI for business: Practical workflows for departments and teams',
          'Analyzing documents: Summarization, synthesis, and key takeaway extraction',
          'Research and analysis: Evaluating sources, fact-checking, and structured data output',
          'Multimodal capabilities: Introduction to AI image generation and media tools',
          'AI agents and automation: Understanding where the tech is going next',
          'Risks, bias, and hallucinations: Knowing when to trust and when to verify',
          'Data privacy and security: Safe usage of corporate information and intellectual property',
          'Actionable next steps: How to continue learning and building daily AI routines'
        ]
      }
    ],
    deliveryMethod: 'Online',
    dates: 'August 28–29, 2026',
    time: '10:30 AM – 3:30 PM',
    breakTime: '12:30 PM – 2:00 PM',
    timezone: 'UAE time (GST / UTC+4)',
    pricing: {
      individual: 'Free for individuals',
      company: 'AED 400 per attendee for companies',
      individualPrice: 0,
      companyPrice: 400,
      currency: 'AED'
    },
    registrationStatus: 'Open',
    duration: '2 Days (10 hours)',
    featured: true
  }
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};
