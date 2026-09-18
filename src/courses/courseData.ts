import { Course } from '../types';

export const courses: Course[] = [
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
  },
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
    id: 'ai-without-fear',
    slug: 'ai-without-fear',
    title: 'AI Without Fear',
    subtitle: 'Understanding AI without hype, panic or blind trust',
    shortDescription: 'A two-hour, discussion-led session that replaces AI anxiety with clear thinking — what AI actually is, what it can and cannot be trusted with, and how to judge the extreme claims around it.',
    longDescription: 'AI Without Fear is a two-hour, discussion-led workshop for anyone who feels anxious, sceptical or simply confused about artificial intelligence. There is no hype and no doom. Instead you will look at what AI actually is, why a fluent answer is not the same as a true one, where the real risks sit, and how to separate a demonstrated capability from a speculative claim. Two short labs — a hallucination hunt and an ethics scenario discussion — turn the conversation into practice, and you leave with your own AI constitution: practical rules for when to trust AI, when to verify it, and when to refuse it access.',
    audience: [
      'Professionals and managers who feel unsure about what AI means for their work',
      'Parents, teachers and students worried about AI and education',
      'Leaders and decision-makers who have to set the rules for AI use',
      'Sceptics who want evidence rather than hype or panic',
      'Anyone who wants a calm, practical way to think about AI — no coding or technical background required'
    ],
    audienceSummary: 'Non-Technical / Everyone',
    learningOutcomes: [
      'Separate AI fact from AI fiction, and fluency from truth',
      'Explain in plain language how models, applications, agents and autonomous systems differ',
      'Ask what level of trust is appropriate for a task, instead of only what AI can do',
      'Evaluate extreme AI claims using evidence, assumptions and incentives',
      'Recognise the four categories of AI risk and the five ethical questions behind them',
      'Walk away with your own AI constitution: when to use AI, when to verify it and when to refuse it access'
    ],
    outline: [
      {
        title: 'What We Fear, and What AI Actually Is',
        items: [
          'Fear inventory: the fears and hopes people bring to AI, and what evidence would reduce the uncertainty',
          'Stop saying "AI": models, applications, agents, autonomous systems and their real-world consequences',
          'The AI loop: data, model, output, human or system action, and feedback',
          'Why AI sounds intelligent: fluency is not truth, and confidence is not knowledge'
        ]
      },
      {
        title: 'Capability, Reliability and the Hallucination Problem',
        items: [
          'Capability is not reliability: asking what level of trust is appropriate for this task',
          'Plausible is not true: incorrect facts, invented citations, fabricated quotations and false explanations',
          'AI lab — trust, test, verify: 8 minutes hunting hallucinations, 4 minutes changing the prompt, 2 minutes sharing observations',
          'Capability vs reliability: brainstorming, learning, work decisions and high-stakes decisions'
        ]
      },
      {
        title: 'Who Controls AI? Ethics, Power and Risk',
        items: [
          'The chain of control: data, compute, models, companies, applications, institutions and society',
          'Five ethical questions: consent, fairness, accountability, transparency and power',
          'Four categories of AI risk: individual, institutional, societal and catastrophic',
          'Ethics lab — what would responsible look like? Hiring AI, AI companions, workplace automation, synthetic media and creative work'
        ]
      },
      {
        title: 'Possibility is Not Probability: Judging Extreme Claims',
        items: [
          'Sorting the observed, the demonstrated, the predicted and the speculated',
          'The AI claim detector: who is claiming, what exactly, what evidence, what assumptions, what incentives, and what would change your mind',
          'Case study: AI agents and cybersecurity — what an incident demonstrates and what it does not',
          'You are not a passenger: how technology, institutions, jobs, laws, culture and people adapt'
        ]
      },
      {
        title: 'Your AI Constitution',
        items: [
          'The four commitments: what I will use AI for, when I will verify AI output, what I will never give AI unrestricted access to, and what I will ask when I hear an extreme claim',
          'Working through the participant workbook and your pre-workshop questionnaire responses',
          'Repeating question 6 from the questionnaire to notice what has changed in your thinking',
          'Taking your constitution back to your team as your own rules of use'
        ]
      }
    ],
    deliveryMethod: 'Online',
    dates: 'Friday Sep 18 & Saturday Sep 19',
    time: '4:00 PM – 6:00 PM',
    breakTime: '10 minute break',
    timezone: 'UAE time (GST / UTC+4)',
    pricing: {
      individual: 'Free for individuals',
      company: 'AED 400 per attendee for companies',
      individualPrice: 0,
      companyPrice: 400,
      currency: 'AED'
    },
    // Registration for the Sep 18 & 19 sessions has closed. Closed courses no
    // longer render the public registration form; they render the
    // "Request This Course" form instead (see pages/CourseDetail.tsx).
    registrationStatus: 'Closed',
    duration: '2 Hours (Single Session)',
    featured: true,
    infoNote: 'No technical or coding background is required. This is a discussion-led session — bring your questions and your scepticism.'
  }
];

export const getCourseBySlug = (slug: string): Course | undefined => {
  return courses.find(course => course.slug === slug);
};

export const getCourseById = (id: string): Course | undefined => {
  return courses.find(course => course.id === id);
};
