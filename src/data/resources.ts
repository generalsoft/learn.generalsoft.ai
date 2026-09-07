/**
 * Resources / blog articles focused on UAE AI adoption. Each article ends with
 * a relevant call-to-action so the resources section supports lead generation.
 */

export interface ResourceSection {
  heading?: string;
  paragraphs?: string[];
  bullets?: string[];
}

export interface ResourceArticle {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  sections: ResourceSection[];
  cta: { title: string; text: string; label: string; to: string };
}

export const resources: ResourceArticle[] = [
  {
    slug: "how-uae-schools-should-prepare-for-ai",
    title: "How UAE Schools Should Prepare for AI",
    excerpt:
      "A practical starting point for school leaders who want to move beyond the noise and build real AI capability.",
    category: "Schools",
    readTime: "5 min read",
    date: "September 2026",
    sections: [
      {
        paragraphs: [
          "AI is already changing how students learn, how teachers work and how future careers will evolve. For UAE schools, the question is no longer whether to engage with AI — it is how to do so deliberately, responsibly and in a way that supports teachers rather than adding to their workload.",
        ],
      },
      {
        heading: "Start with people, not tools",
        paragraphs: [
          "The most effective schools do not begin by buying software. They begin by helping teachers, students and parents understand what AI is, what it is genuinely useful for, and where it must be used with care. A clear, shared understanding across the whole school community is the foundation for everything else.",
        ],
      },
      {
        heading: "Build capability in layers",
        paragraphs: [
          "A pragmatic approach is to build AI capability across the whole school community in stages:",
        ],
        bullets: [
          "Leadership — agree a vision and an AI readiness baseline.",
          "Teachers — provide practical, classroom-focused professional development.",
          "Students — deliver age-appropriate AI literacy and responsible use.",
          "Parents — run awareness sessions on homework, privacy and integrity.",
          "Policy — document clear guidance on appropriate and responsible use.",
        ],
      },
      {
        heading: "Take a small, practical first step",
        paragraphs: [
          "A complimentary AI session or a readiness consultation is a low-risk way to begin. It gives your leadership team a clear picture of where the school stands today and what a realistic roadmap looks like.",
        ],
      },
    ],
    cta: {
      title: "Not sure where to start?",
      text: "Book a complimentary AI readiness consultation and get a clear picture of your school's next step.",
      label: "Assess Your School's AI Readiness",
      to: "/schools/ai-readiness",
    },
  },
  {
    slug: "ai-readiness-checklist-for-uae-schools",
    title: "AI Readiness Checklist for UAE Schools",
    excerpt:
      "Use this checklist to quickly gauge how ready your school is to adopt AI thoughtfully.",
    category: "Schools",
    readTime: "4 min read",
    date: "September 2026",
    sections: [
      {
        paragraphs: [
          "AI readiness is not about having the most software. It is about whether your school has the understanding, capability and guidance in place to use AI well. Work through the areas below to see where your school stands.",
        ],
      },
      {
        heading: "Leadership and vision",
        bullets: [
          "We have a clear, agreed vision for how AI supports learning.",
          "Leadership understands AI's opportunities and risks.",
          "AI is on the school's strategic agenda, not an afterthought.",
        ],
      },
      {
        heading: "Teachers and students",
        bullets: [
          "Teachers have access to practical AI professional development.",
          "Students receive age-appropriate AI literacy.",
          "Responsible use and academic integrity are explicitly taught.",
        ],
      },
      {
        heading: "Policy and parents",
        bullets: [
          "The school has written guidance on appropriate AI use.",
          "Parents are informed about AI and how they can support their children.",
          "There is a plan to review AI policy as the technology evolves.",
        ],
      },
      {
        heading: "What next?",
        paragraphs: [
          "If you answered 'not yet' to several of these, you are not alone — most schools are early in this journey. A short readiness consultation can turn this checklist into a practical, prioritised action plan.",
        ],
      },
    ],
    cta: {
      title: "Turn the checklist into a plan",
      text: "Request a complimentary AI readiness consultation for your school leadership team.",
      label: "Request My AI Readiness Consultation",
      to: "/schools/ai-readiness",
    },
  },
  {
    slug: "10-ways-teachers-can-use-ai-to-save-time",
    title: "10 Ways Teachers Can Use AI to Save Time",
    excerpt:
      "Practical, classroom-ready ways for teachers to reduce admin and planning time — without losing control of quality.",
    category: "Teachers",
    readTime: "6 min read",
    date: "September 2026",
    sections: [
      {
        paragraphs: [
          "Teachers are among the most time-poor professionals anywhere. AI will not replace great teaching, but used well it can remove hours of repetitive work each week. Here are ten practical places to start.",
        ],
      },
      {
        heading: "Planning and resources",
        bullets: [
          "Drafting lesson plans and unit outlines to then adapt and refine.",
          "Generating differentiated versions of a worksheet or reading.",
          "Creating practice questions and quizzes for different ability levels.",
          "Summarising long source material into key points for a lesson.",
        ],
      },
      {
        heading: "Feedback and admin",
        bullets: [
          "Drafting feedback comments to personalise and review.",
          "Writing clear, parent-friendly progress updates.",
          "Turning bullet points into polished communications and newsletters.",
          "Building simple rubrics and marking criteria.",
        ],
      },
      {
        heading: "Responsible use matters",
        paragraphs: [
          "AI output is a starting point, not a final product. Teachers should always review, correct and personalise. Protect student data, verify facts, and keep academic integrity front and centre. A short professional development session is the fastest way to build confidence with these workflows.",
        ],
      },
    ],
    cta: {
      title: "Give your teachers back their time",
      text: "Book practical, classroom-focused AI training for your teaching team.",
      label: "Book Teacher Training",
      to: "/schools",
    },
  },
  {
    slug: "what-parents-need-to-know-about-ai-and-children",
    title: "What Parents Need to Know About AI and Children",
    excerpt:
      "A calm, practical guide for parents on AI, homework, privacy and how to support their children.",
    category: "Parents",
    readTime: "5 min read",
    date: "September 2026",
    sections: [
      {
        paragraphs: [
          "AI tools are now part of children's everyday lives — from homework helpers to the chatbots and apps they already use. Parents do not need to become experts, but a little understanding makes it much easier to guide children responsibly.",
        ],
      },
      {
        heading: "AI and homework",
        paragraphs: [
          "AI can explain concepts, generate practice questions and help children understand difficult material. The risk is that it can also do the thinking for them. Encourage children to use AI as a tutor and a starting point — not as a shortcut that replaces their own effort.",
        ],
      },
      {
        heading: "What to watch for",
        bullets: [
          "Academic integrity — help children understand what honest help looks like.",
          "Privacy — keep personal information out of AI tools.",
          "Deepfakes and misinformation — teach children to question what they see.",
          "Balance — AI is a tool, not a substitute for learning and conversation.",
        ],
      },
      {
        heading: "How to support your child",
        paragraphs: [
          "The most useful thing parents can do is stay curious and have open conversations. Ask your child how they use AI, what they find helpful, and what confuses them. A parent awareness session can give you practical, age-appropriate guidance in under an hour.",
        ],
      },
    ],
    cta: {
      title: "Understand AI so you can guide your child",
      text: "Request a parent awareness session at your child's school.",
      label: "Request a Parent Session",
      to: "/schools",
    },
  },
  {
    slug: "how-ai-will-change-jobs-in-the-uae",
    title: "How AI Will Change Jobs in the UAE",
    excerpt:
      "AI will change most jobs — and create new ones. Here is what that means for professionals in the UAE.",
    category: "Business",
    readTime: "6 min read",
    date: "September 2026",
    sections: [
      {
        paragraphs: [
          "AI is not a single event that will suddenly replace jobs. It is a steady shift in the tasks that make up almost every role. In the UAE, where digital transformation is a national priority, the professionals who adapt first will have a measurable advantage.",
        ],
      },
      {
        heading: "Jobs will change more than disappear",
        paragraphs: [
          "Most roles will evolve rather than vanish. AI takes on repetitive, time-consuming tasks — drafting, summarising, research, data entry, scheduling — leaving people to focus on judgement, creativity, relationships and decisions. The most valuable skill is knowing how to use AI well.",
        ],
      },
      {
        heading: "The skills that will matter",
        bullets: [
          "Prompting and working confidently with AI tools.",
          "Critical thinking and evaluating AI output.",
          "Judgement, communication and collaboration.",
          "Adaptability and a habit of continuous learning.",
        ],
      },
      {
        heading: "What professionals should do now",
        paragraphs: [
          "Start with practical, hands-on training rather than theory. Learn how to use AI in your actual role, understand its limits, and build a personal workflow. Organisations that invest in AI readiness for their teams will move faster — and keep their people confident.",
        ],
      },
    ],
    cta: {
      title: "Future-proof your team",
      text: "Explore practical AI training for your organisation.",
      label: "Explore Business AI Training",
      to: "/business",
    },
  },
  {
    slug: "ai-training-for-businesses-where-to-start",
    title: "AI Training for Businesses: Where Should You Start?",
    excerpt:
      "A practical guide to launching AI training in your organisation without getting lost in jargon.",
    category: "Business",
    readTime: "5 min read",
    date: "September 2026",
    sections: [
      {
        paragraphs: [
          "Most organisations know they should do something about AI — but 'something' is hard to define. The most effective way to start is with practical training that connects AI directly to the work your teams already do.",
        ],
      },
      {
        heading: "Start with real workflows",
        paragraphs: [
          "Begin with the tasks your people repeat every week: writing, summarising, researching, reporting, customer communication. Show how AI can speed up each one. Practical wins build confidence faster than a technical overview ever will.",
        ],
      },
      {
        heading: "Train by audience, not one-size-fits-all",
        bullets: [
          "Executives — AI strategy, opportunity and governance.",
          "Managers — adoption, measurement and responsible oversight.",
          "Teams — department-specific workflows and tools.",
          "Everyone — responsible AI, privacy and safe use.",
        ],
      },
      {
        heading: "Make it measurable",
        paragraphs: [
          "Agree on what success looks like before you begin — hours saved, faster outputs, better consistency. A short consultation can help you choose the right starting point and avoid wasting budget on generic content.",
        ],
      },
    ],
    cta: {
      title: "Start with a conversation",
      text: "Book a consultation to map the right AI training for your organisation.",
      label: "Book an AI Consultation",
      to: "/contact",
    },
  },
  {
    slug: "ai-training-in-ras-al-khaimah",
    title: "AI Training in Ras Al Khaimah",
    excerpt:
      "Practical AI training for organisations, schools and professionals in Ras Al Khaimah and the RAKEZ ecosystem.",
    category: "UAE",
    readTime: "4 min read",
    date: "September 2026",
    sections: [
      {
        paragraphs: [
          "Ras Al Khaimah is home to a fast-growing business community — from RAKEZ companies to schools and government-aligned organisations. As AI adoption accelerates across the UAE, access to practical, locally relevant training has become a genuine competitive advantage.",
        ],
      },
      {
        heading: "Training that fits the local context",
        paragraphs: [
          "Our programmes are designed for the UAE environment — delivered on-site in Ras Al Khaimah or online, and tailored to the needs of companies, schools and professionals across the RAKEZ ecosystem. We focus on practical, real-world use rather than technical theory.",
        ],
      },
      {
        heading: "What we deliver locally",
        bullets: [
          "Corporate AI training for teams and leadership.",
          "School AI programmes for students, teachers and parents.",
          "Teacher professional development and student workshops.",
          "AI readiness consulting for organisations and schools.",
        ],
      },
      {
        heading: "Easy to get started",
        paragraphs: [
          "Whether you are a growing company in RAKEZ or a school preparing students for the future, the first step is a short conversation about your goals.",
        ],
      },
    ],
    cta: {
      title: "Training in Ras Al Khaimah",
      text: "Explore AI training for organisations and schools in RAKEZ and Ras Al Khaimah.",
      label: "Explore RAKEZ AI Training",
      to: "/rakez",
    },
  },
  {
    slug: "how-companies-can-build-an-ai-ready-workforce",
    title: "How Companies Can Build an AI-Ready Workforce",
    excerpt:
      "A practical framework for building AI capability across your organisation — from awareness to everyday use.",
    category: "Business",
    readTime: "6 min read",
    date: "September 2026",
    sections: [
      {
        paragraphs: [
          "An AI-ready workforce is not a team of engineers. It is an organisation where people at every level understand AI, use it responsibly in their daily work, and feel confident about the change around them.",
        ],
      },
      {
        heading: "Awareness before adoption",
        paragraphs: [
          "People adopt tools they understand and trust. Start with clear, practical awareness sessions that connect AI to real tasks. Address the legitimate concerns — privacy, accuracy, job impact — openly rather than glossing over them.",
        ],
      },
      {
        heading: "Build a layered programme",
        bullets: [
          "Leadership awareness and AI strategy.",
          "Manager training on adoption and oversight.",
          "Role-specific workshops for departments.",
          "Responsible AI guidance across the organisation.",
        ],
      },
      {
        heading: "Reinforce with practice",
        paragraphs: [
          "Training sticks when people apply it immediately. Encourage teams to bring their real work into sessions, and follow up with practical resources and support. The goal is a habit, not a one-off workshop.",
        ],
      },
    ],
    cta: {
      title: "Build your AI-ready workforce",
      text: "Book a consultation to design an AI training programme around your organisation.",
      label: "Book an AI Consultation",
      to: "/contact",
    },
  },
];
