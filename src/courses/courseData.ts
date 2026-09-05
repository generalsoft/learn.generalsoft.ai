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
          'Overview of the Local AI: costs and benefits',
          'Communicating with AI: What, When, Why, Where, and How questions + Context',
          'Everyday productivity: Task Execution',
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
    time: 'specified in registration email',
    breakTime: 'specified in registration email',
    timezone: 'UAE time (GST / UTC+4)',
    pricing: {
      individual: 'Free for individuals',
      company: 'AED 400 per attendee for companies',
      individualPrice: 0,
      companyPrice: 400,
      currency: 'AED'
    },
    registrationStatus: 'Closed',
    duration: '2 Days (10 hours or less)',
    featured: true,
    audienceSummary: 'Non-Technical / Professionals',
    infoNote: 'No technical or coding background is required to participate in this training.'
  },
  {
    id: 'ai-under-the-hood',
    slug: 'ai-under-the-hood',
    title: 'AI Under the Hood',
    subtitle: 'A technical deep-dive into how modern AI and large language models actually work',
    shortDescription: 'Go beyond the surface and understand the mechanics of modern AI — from text, vectors, and contextual generation to backpropagation and agentic systems.',
    longDescription: 'This course takes you inside modern AI systems to understand what actually happens under the hood. You will learn how large language models turn text into vectors and generate output token by token, how neural networks learn through backpropagation and gradient corrections, and how agentic harnesses connect models to tools, memory, and real-world action. It is built for technical professionals and anyone who wants a rigorous, foundational understanding of AI rather than a black-box overview.',
    audience: [
      'Software developers and engineers who want to understand what powers the models they use',
      'Technical leads, architects, and data professionals evaluating AI systems',
      'IT and security specialists who need to reason about how AI behaves internally',
      'Technical founders and product builders integrating AI into their products',
      'Curious learners who want more than a high-level overview of AI'
    ],
    audienceSummary: 'Technical Professionals & Builders',
    learningOutcomes: [
      'Understand what AI, machine learning, and large language models mean — precisely and practically',
      'Explain how LLMs represent text as vectors and generate output one token at a time',
      'Describe how neural networks learn via backpropagation and error correction',
      'Understand how agentic harnesses connect models to tools, memory, and real-world action',
      'Reason critically about model capabilities, limitations, and failure modes'
    ],
    outline: [
      {
        title: 'Module 1: AI Under the Hood — Meaning, Use, and Understanding',
        items: [
          'What AI and machine learning actually mean',
          'The landscape of modern models and where LLMs fit',
          'What these systems are genuinely good for'
        ]
      },
      {
        title: 'Module 2: Inside the LLM — Text, Vectors, and Contextual Generation',
        items: [
          'Tokens and embeddings: how text becomes numbers',
          'Attention and context windows',
          'How models generate text step by step'
        ]
      },
      {
        title: 'Module 3: How AI Learns — Backpropagation and Neural Corrections',
        items: [
          'Neural networks, weights, and activations',
          'Loss, gradients, and backpropagation',
          'How models improve through correction'
        ]
      },
      {
        title: 'Module 4: The Agentic Harness — From Brain in a Jar to Real-World Action',
        items: [
          'What agentic really means',
          'Tools, memory, and planning loops',
          'Connecting models to real-world systems and actions'
        ]
      }
    ],
    deliveryMethod: 'Online',
    dates: 'To be announced',
    time: 'To be announced',
    breakTime: '',
    timezone: 'UAE time (GST / UTC+4)',
    pricing: {
      individual: 'To be announced',
      company: 'To be announced',
      individualPrice: 0,
      companyPrice: 0,
      currency: 'AED'
    },
    registrationStatus: 'Upcoming',
    duration: 'To be announced',
    featured: true,
    infoNote: 'Details, dates, and pricing will be announced soon. Submit your interest to be notified first.'
  }
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};
