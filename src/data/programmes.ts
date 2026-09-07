/**
 * Programme catalogue grouped by outcome rather than a flat list of technical
 * courses. Programmes are enquiry-driven: the primary conversion is a
 * consultation or programme request, not an online purchase.
 */

export type ProgrammeCategoryId = 'business' | 'schools' | 'professional';

export interface Programme {
  id: string;
  title: string;
  tagline: string;
  whoFor: string;
  learn: string[];
  duration: string;
  delivery: string;
  customised: boolean;
  link: string;
}

export interface ProgrammeCategory {
  id: ProgrammeCategoryId;
  title: string;
  description: string;
  link: string;
  programmes: Programme[];
}

export const programmeCategories: ProgrammeCategory[] = [
  {
    id: 'business',
    title: 'AI for Business',
    description:
      'Practical AI training for teams, managers and professionals who want to work smarter and lead confidently.',
    link: '/business',
    programmes: [
      {
        id: 'ai-productivity',
        title: 'AI Productivity',
        tagline: 'Work faster with everyday AI tools.',
        whoFor: 'All employees and teams across departments.',
        learn: ['Everyday AI tools', 'Writing & drafting', 'Summarising documents', 'Email and admin workflows'],
        duration: 'Half-day or full-day workshop',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/business',
      },
      {
        id: 'generative-ai',
        title: 'Generative AI',
        tagline: 'Understand and use the tools transforming work.',
        whoFor: 'Professionals and managers new to generative AI.',
        learn: ['How generative AI works', 'ChatGPT & similar tools', 'Practical use cases', 'Risks and limits'],
        duration: 'Half-day or full-day workshop',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/business',
      },
      {
        id: 'prompt-engineering',
        title: 'Prompt Engineering',
        tagline: 'Get reliable, high-quality results from AI.',
        whoFor: 'Anyone who uses AI tools at work.',
        learn: ['Prompt patterns', 'Context and instructions', 'Structured outputs', 'Iteration and review'],
        duration: 'Half-day workshop',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/business',
      },
      {
        id: 'ai-for-marketing',
        title: 'AI for Marketing',
        tagline: 'Faster content, campaigns and insight.',
        whoFor: 'Marketing and communications teams.',
        learn: ['Content generation', 'Campaign ideation', 'Audience research', 'Brand-safe prompting'],
        duration: 'Half-day or full-day workshop',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/business',
      },
      {
        id: 'ai-for-hr',
        title: 'AI for HR',
        tagline: 'Smarter recruitment, onboarding and people ops.',
        whoFor: 'HR, recruitment and people teams.',
        learn: ['Job descriptions', 'Screening support', 'Onboarding material', 'Policy and bias awareness'],
        duration: 'Half-day or full-day workshop',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/business',
      },
      {
        id: 'ai-for-management',
        title: 'AI for Management',
        tagline: 'Lead AI adoption across your team.',
        whoFor: 'Managers, team leaders and heads of department.',
        learn: ['AI strategy basics', 'Team adoption', 'Measuring impact', 'Responsible oversight'],
        duration: 'Half-day or full-day workshop',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/business',
      },
      {
        id: 'ai-strategy',
        title: 'AI Strategy',
        tagline: 'Turn AI interest into an organisational plan.',
        whoFor: 'Executives, founders and leadership teams.',
        learn: ['Opportunity mapping', 'Readiness assessment', 'Prioritisation', 'Governance and ethics'],
        duration: 'Executive briefing or strategy session',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/business',
      },
    ],
  },
  {
    id: 'schools',
    title: 'AI for Schools',
    description:
      'Programmes for students, teachers, parents and school leadership — building AI capability across the whole school.',
    link: '/schools',
    programmes: [
      {
        id: 'student-ai-literacy',
        title: 'Student AI Literacy',
        tagline: 'Prepare students for an AI-powered world.',
        whoFor: 'Students of all ages and grade levels.',
        learn: ['How AI works', 'Responsible use', 'Future careers', 'Hands-on challenges'],
        duration: '45–90 minute session or workshop series',
        delivery: 'Onsite at your school or online',
        customised: true,
        link: '/schools',
      },
      {
        id: 'ai-for-teachers',
        title: 'AI for Teachers',
        tagline: 'Work smarter, teach better.',
        whoFor: 'Teachers, teaching assistants and coordinators.',
        learn: ['Lesson planning', 'Resources', 'Assessment', 'Differentiation', 'Admin productivity'],
        duration: 'Half-day or full-day CPD',
        delivery: 'Onsite at your school or online',
        customised: true,
        link: '/schools',
      },
      {
        id: 'responsible-ai',
        title: 'Responsible AI',
        tagline: 'Ethics, privacy and academic integrity.',
        whoFor: 'Students, teachers and school leaders.',
        learn: ['Academic integrity', 'Privacy', 'Deepfakes', 'Misinformation', 'Ethics'],
        duration: '45–90 minute session',
        delivery: 'Onsite at your school or online',
        customised: true,
        link: '/schools',
      },
      {
        id: 'ai-future-careers',
        title: 'AI & Future Careers',
        tagline: 'How AI is changing jobs and skills.',
        whoFor: 'Students and parents.',
        learn: ['Career shifts', 'Future skills', 'Prompting', 'Live AI demonstrations'],
        duration: '45–90 minute session',
        delivery: 'Onsite at your school or online',
        customised: true,
        link: '/schools',
      },
      {
        id: 'parent-ai-awareness',
        title: 'Parent AI Awareness',
        tagline: 'What parents need to know about AI and children.',
        whoFor: 'Parents and guardians.',
        learn: ['AI and homework', 'Academic integrity', 'Privacy', 'Deepfakes', 'Supporting children'],
        duration: '60 minute session',
        delivery: 'Onsite at your school or online',
        customised: true,
        link: '/schools',
      },
      {
        id: 'ai-readiness',
        title: 'AI Readiness',
        tagline: 'Assess and build whole-school AI capability.',
        whoFor: 'School leadership and governing boards.',
        learn: ['Readiness assessment', 'AI policy guidance', 'Strategy session', 'Follow-up recommendations'],
        duration: 'Consultation and roadmap',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/schools/ai-readiness',
      },
    ],
  },
  {
    id: 'professional',
    title: 'Professional AI Skills',
    description:
      'Focused technical and practitioner skills for professionals who want to go deeper — including our technical deep-dives.',
    link: '/courses',
    programmes: [
      {
        id: 'generative-ai-skills',
        title: 'Generative AI',
        tagline: 'A practical grounding in generative tools.',
        whoFor: 'Professionals and analysts.',
        learn: ['Generative models', 'Text, image and media tools', 'Workflows', 'Limitations'],
        duration: 'Half-day or full-day workshop',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/courses',
      },
      {
        id: 'prompt-engineering-skills',
        title: 'Prompt Engineering',
        tagline: 'Structured prompting for reliable outputs.',
        whoFor: 'Knowledge workers and builders.',
        learn: ['Prompt patterns', 'Structured data', 'Evaluation', 'Iteration'],
        duration: 'Half-day workshop',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/courses',
      },
      {
        id: 'ai-tools',
        title: 'AI Tools',
        tagline: 'Build a practical AI toolkit.',
        whoFor: 'Professionals evaluating and adopting AI tools.',
        learn: ['Tool landscape', 'Selection criteria', 'Workflow integration', 'Security'],
        duration: 'Half-day or full-day workshop',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/courses',
      },
      {
        id: 'data-and-ai',
        title: 'Data & AI',
        tagline: 'Use data responsibly to inform AI.',
        whoFor: 'Analysts and technical professionals.',
        learn: ['Data fundamentals', 'Data quality', 'AI inputs and outputs', 'Evaluation'],
        duration: 'Half-day or full-day workshop',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/courses',
      },
      {
        id: 'automation',
        title: 'Automation',
        tagline: 'Automate repetitive work with AI.',
        whoFor: 'Operations and administrative teams.',
        learn: ['Task automation', 'AI agents', 'Workflow design', 'Guardrails'],
        duration: 'Half-day or full-day workshop',
        delivery: 'Online or onsite (UAE)',
        customised: true,
        link: '/courses',
      },
    ],
  },
];
