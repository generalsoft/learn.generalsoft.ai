/**
 * UAE Ministry of Education - AI Curriculum Framework
 * Student Learning Outcomes (KG-12).
 *
 * Structure: Grade -> Domain -> Strand -> Standard -> Learning Outcome(s).
 * Source: official curriculum framework structure document.
 */

export interface CurriculumStandard {
  standard: string;
  outcomes: string[];
}

export interface CurriculumStrand {
  name: string;
  standards: CurriculumStandard[];
}

export interface CurriculumDomain {
  id: string;
  name: string;
  description: string;
  strands: CurriculumStrand[];
}

export interface CurriculumGrade {
  grade: string;
  label: string;
  domains: CurriculumDomain[];
}

export const curriculumDomains: { id: string; name: string; description: string; strands: string[] }[] = [
  {
    id: "foundations",
    name: "AI Foundations and Core Principles",
    description: "How AI systems work: human-made tools that follow instructions, learn from data, and use algorithms to make decisions.",
    strands: ["Foundations and Fundamentals of AI", "Data, Algorithms, and Machine Learning"],
  },
  {
    id: "responsible",
    name: "Responsible and Ethical AI",
    description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
    strands: ["Ethics, Bias, and Fairness in AI", "AI Policies, and Accountability"],
  },
  {
    id: "applications",
    name: "AI Applications, Innovation, and Practice",
    description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
    strands: ["AI Applications in Society and Industry", "Innovation and Projects Design", "Usage of AI Tools"],
  },
];

export const curriculum: CurriculumGrade[] = [
  {
    grade: "KG",
    label: "Kindergarten",
    domains: [
      {
        id: "foundations",
        name: "AI Foundations and Core Principles",
        description: "How AI systems work: human-made tools that follow instructions, learn from data, and use algorithms to make decisions.",
        strands: [
          {
            name: "Foundations and Fundamentals of AI",
            standards: [
              {
                standard: "Explain that AI systems are human-created tools that follow instructions and use data.",
                outcomes: [
                  "Identify that humans make AI tools to help do simple tasks.",
                  "Show that robots and AI follow the instructions given to them by humans.",
                  "Differentiate between pretend robots and actual AI tools.",
                ],
              },
              {
                standard: "Compare how artificial intelligence is similar to or different from humans.",
                outcomes: [
                  "Identify that people have feelings and machines do not.",
                ],
              },
            ],
          },
          {
            name: "Data, Algorithms, and Machine Learning",
            standards: [
              {
                standard: "Explain how AI systems use data to learn.",
                outcomes: [
                  "Describe that AI learns by repeating actions or patterns.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Identify safe and fair ways to use AI.",
                outcomes: [
                  "Explain safe actions when using digital tools.",
                ],
              },
            ],
          },
          {
            name: "AI Policies, and Accountability",
            standards: [
              {
                standard: "Identify ways humans control AI to ensure fairness and protect personal information.",
                outcomes: [
                  "Explain that humans are responsible for what AI does.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "AI Applications in Society and Industry",
            standards: [
              {
                standard: "Identify everyday uses of AI across different sectors.",
                outcomes: [
                  "Discuss where AI tools are found at home, school, and in the city.",
                  "Describe how AI tools help people and families.",
                ],
              },
            ],
          },
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI projects that support humans in everyday tasks.",
                outcomes: [
                  "Create a simple story to show how AI can help humans.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: "01",
    label: "Grade 1",
    domains: [
      {
        id: "foundations",
        name: "AI Foundations and Core Principles",
        description: "How AI systems work: human-made tools that follow instructions, learn from data, and use algorithms to make decisions.",
        strands: [
          {
            name: "Foundations and Fundamentals of AI",
            standards: [
              {
                standard: "Explain that AI systems are human-created tools that follow instructions and use data.",
                outcomes: [
                  "Explain that AI systems follow the instructions given by humans.",
                ],
              },
              {
                standard: "Compare how artificial intelligence is similar to or different from humans.",
                outcomes: [
                  "Identify that people have feelings, and AI does not.",
                ],
              },
            ],
          },
          {
            name: "Data, Algorithms, and Machine Learning",
            standards: [
              {
                standard: "Explain how AI systems use data to learn.",
                outcomes: [
                  "Identify that AI finds patterns by grouping things by size, colour, or shape.",
                  "Identify that AI learns from many examples to find patterns.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Identify safe and fair ways to use AI.",
                outcomes: [
                  "Explain that people help AI learn what is fair.",
                  "Identify when a computer or robot makes a fair or unfair choice.",
                  "Demonstrate fair behaviour when sharing technology with others.",
                ],
              },
            ],
          },
          {
            name: "AI Policies, and Accountability",
            standards: [
              {
                standard: "Identify ways humans control AI to ensure fairness and protect personal information.",
                outcomes: [
                  "Identify how humans help smart machines learn and improve.",
                  "Identify that machines cannot make their own decisions.",
                  "Describe why it is important to have clear and fair rules for AI systems.",
                  "Demonstrate safe and unsafe choices when using AI and digital tools.",
                  "Identify personal information that should be kept private.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "AI Applications in Society and Industry",
            standards: [
              {
                standard: "Identify everyday uses of AI across different sectors.",
                outcomes: [
                  "Identify examples of AI tools commonly used in the community.",
                ],
              },
            ],
          },
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI projects that support humans in everyday tasks.",
                outcomes: [
                  "Identify simple group roles when working together to design an AI helper or game.",
                  "Describe a simple real-world problem that an AI helper or game could help solve.",
                  "Discuss how an AI helper or game is used to support people in everyday tasks.",
                  "Identify simple features of an AI-based game or helper.",
                  "List more than one possible idea for how an AI helper or game can work.",
                  "Choose the final AI solution for the identified problem.",
                  "Draw a simple model of an AI helper or game.",
                  "Identify whether the AI helper or game is helpful and safe.",
                  "Improve the AI helper or game by making changes based on teacher-guided feedback.",
                  "Describe the AI helper or game, including team roles, the problem, and how it helps people.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: "02",
    label: "Grade 2",
    domains: [
      {
        id: "foundations",
        name: "AI Foundations and Core Principles",
        description: "How AI systems work: human-made tools that follow instructions, learn from data, and use algorithms to make decisions.",
        strands: [
          {
            name: "Foundations and Fundamentals of AI",
            standards: [
              {
                standard: "Explain that AI systems are human-created tools that follow instructions and use data.",
                outcomes: [
                  "Identify how unclear instructions can cause machines to make mistakes.",
                  "Identify how humans are needed to fix AI mistakes.",
                ],
              },
              {
                standard: "Compare how artificial intelligence is similar to or different from humans.",
                outcomes: [
                  "Compare actions that only humans can do with actions that AI can copy.",
                  "Describe qualities that make humans unique compared to AI systems, such as empathy, imagination, and caring for others.",
                ],
              },
            ],
          },
          {
            name: "Data, Algorithms, and Machine Learning",
            standards: [
              {
                standard: "Explain how AI systems use data to learn.",
                outcomes: [
                  "Describe how AI recognises pictures, sounds, or words by finding patterns in data.",
                  "Identify examples of bad and good data.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Identify safe and fair ways to use AI.",
                outcomes: [
                  "Explain that giving AI many different examples helps it make fairer decisions.",
                  "Describe how AI can make unfair choices when it only learns from limited examples.",
                ],
              },
            ],
          },
          {
            name: "AI Policies, and Accountability",
            standards: [
              {
                standard: "Identify ways humans control AI to ensure fairness and protect personal information.",
                outcomes: [
                  "Explain that humans write clear instructions to guide how AI should behave.",
                  "Demonstrate how unclear or missing instructions can make AI act unfairly.",
                  "Demonstrate how humans and AI can work together to complete a task while keeping humans in charge.",
                  "Identify what information is safe or unsafe to share when using AI or digital tools.",
                  "Explain why personal information should be kept private to stay safe when using technology.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "AI Applications in Society and Industry",
            standards: [
              {
                standard: "Identify everyday uses of AI across different sectors.",
                outcomes: [
                  "Describe how AI helps doctors, nurses, and safety workers do their jobs.",
                  "Explain how AI tools help people communicate with others who speak different languages.",
                ],
              },
            ],
          },
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI projects that support humans in everyday tasks.",
                outcomes: [
                  "Select team roles to support the design of a robot.",
                  "Describe a simple real-world problem that a robot could help solve.",
                  "Observe how robots are used in real life to help people with everyday tasks.",
                  "Identify the required features for a robot-based AI project.",
                  "Compare multiple possible robot designs based on the identified features.",
                  "Select a final robot design that best fits the requirements.",
                  "Develop a simple model of a robot using basic materials or digital tools.",
                  "Evaluate how well the robot design solves the identified problem, using guided criteria.",
                  "Modify the robot design through feedback to improve how it works.",
                  "Design a simple poster to outline team roles, the problem solved, and the final robot design.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: "03",
    label: "Grade 3",
    domains: [
      {
        id: "foundations",
        name: "AI Foundations and Core Principles",
        description: "How AI systems work: human-made tools that follow instructions, learn from data, and use algorithms to make decisions.",
        strands: [
          {
            name: "Foundations and Fundamentals of AI",
            standards: [
              {
                standard: "Explain that AI systems are human-created tools that follow instructions and use data.",
                outcomes: [
                  "Explain that some AI systems learn from examples instead of following fixed instructions.",
                ],
              },
              {
                standard: "Compare how artificial intelligence is similar to or different from humans.",
                outcomes: [
                  "Explain that AI does not have the ability to make moral choices like humans.",
                ],
              },
            ],
          },
          {
            name: "Data, Algorithms, and Machine Learning",
            standards: [
              {
                standard: "Explain how AI systems use data to learn.",
                outcomes: [
                  "Describe how AI learns from large amounts of data to improve its performance.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Identify safe and fair ways to use AI.",
                outcomes: [
                  "Describe what bias means in AI.",
                  "Explain how people can improve AI fairness by providing more complete and diverse examples.",
                  "Explain how bias can cause AI to give incorrect or unfair outputs.",
                ],
              },
              {
                standard: "Evaluate when AI outputs can be trusted and when human judgement is required.",
                outcomes: [
                  "Discuss situations where human judgement is needed to review or correct AI outputs.",
                ],
              },
            ],
          },
          {
            name: "AI Policies, and Accountability",
            standards: [
              {
                standard: "Identify ways humans control AI to ensure fairness and protect personal information.",
                outcomes: [
                  "Describe how to keep personal information private and safe when using AI or online tools.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "AI Applications in Society and Industry",
            standards: [
              {
                standard: "Identify everyday uses of AI across different sectors.",
                outcomes: [
                  "Compare the different ways AI is used in transportation.",
                  "Explain how AI translates words and sentences from one language into another.",
                  "Show how AI can make long information shorter and easier to read.",
                  "Describe how AI can answer questions to help people learn new things.",
                ],
              },
            ],
          },
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI projects that support humans in everyday tasks.",
                outcomes: [
                  "Apply teamwork skills through defined roles linked to AIrelated design tasks.",
                  "Identify user needs in a real-world problem.",
                  "Investigate how human creativity influences the design of real-world AI systems.",
                  "Identify the functional requirements for an AI project.",
                  "Compare multiple possible design ideas based on the identified requirements.",
                  "Select a final AI solution that best fits the project requirements.",
                  "Create a sketch or model that shows how an AI system works.",
                  "Assess how well the AI solution meets user needs.",
                  "Revise the AI design to improve how it works based on feedback.",
                  "Explain the AI project using a poster or model, showing the problem, the solution, and team roles.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: "04",
    label: "Grade 4",
    domains: [
      {
        id: "foundations",
        name: "AI Foundations and Core Principles",
        description: "How AI systems work: human-made tools that follow instructions, learn from data, and use algorithms to make decisions.",
        strands: [
          {
            name: "Foundations and Fundamentals of AI",
            standards: [
              {
                standard: "Explain that AI systems are human-created tools that follow instructions and use data.",
                outcomes: [
                  "Explain that AI uses sets of rules to make different choices in different situations.",
                ],
              },
            ],
          },
          {
            name: "Data, Algorithms, and Machine Learning",
            standards: [
              {
                standard: "Explain how AI systems use data to learn.",
                outcomes: [
                  "Define machine learning.",
                  "Describe how simple AI decisions are made using \"if-then\" rules.",
                  "Explain how AI uses past data patterns to generate predictions.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Identify safe and fair ways to use AI.",
                outcomes: [
                  "Analyse how biased data can affect how AI systems respond to different people or situations.",
                  "Identify situations where AI should or should not be used to make decisions.",
                  "Describe why people, not AI, should decide what is ethical and fair.",
                ],
              },
              {
                standard: "Evaluate when AI outputs can be trusted and when human judgement is required.",
                outcomes: [
                  "Analyse how relying on AI without human judgement can lead to mistakes or unfair decisions.",
                  "Describe how to use AI tools safely by checking results first.",
                ],
              },
            ],
          },
          {
            name: "AI Policies, and Accountability",
            standards: [
              {
                standard: "Identify ways humans control AI to ensure fairness and protect personal information.",
                outcomes: [
                  "Explain why humans make rules to ensure AI behaves fairly and safely.",
                  "Explain how AI systems collect personal information online.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "AI Applications in Society and Industry",
            standards: [
              {
                standard: "Identify everyday uses of AI across different sectors.",
                outcomes: [
                  "Describe how AI uses environmental data to monitor nature, predict weather, and reduce waste.",
                  "Explain how AI systems in different UAE sectors work together to improve daily life.",
                ],
              },
            ],
          },
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI projects that support humans in everyday tasks.",
                outcomes: [
                  "Demonstrate effective teamwork through roles and responsibilities that reflect different AI-related jobs.",
                  "Identify a real-world problem that could be addressed using an AI tool.",
                  "Investigate real-world uses of AI tools.",
                  "Specify clear technical and user-centered requirements for an AI project through collaborative planning.",
                  "Evaluate multiple existing solutions based on feasibility and user needs.",
                  "Select a final AI tool that best meets the identified requirements.",
                  "Create a simple model or prototype of the selected AI tool.",
                  "Assess the AI tool against given criteria.",
                  "Improve the AI tool by refining it based on evaluation results and feedback.",
                  "Develop a presentation outlining how teamwork, research, design decisions, and improvements led to the final solution.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: "05",
    label: "Grade 5",
    domains: [
      {
        id: "foundations",
        name: "AI Foundations and Core Principles",
        description: "How AI systems work: human-made tools that follow instructions, learn from data, and use algorithms to make decisions.",
        strands: [
          {
            name: "Foundations and Fundamentals of AI",
            standards: [
              {
                standard: "Compare how artificial intelligence is similar to or different from humans.",
                outcomes: [
                  "Describe how AI systems and humans differ in perception.",
                  "Differentiate between AI-generated emotional responses and genuine human empathy.",
                ],
              },
            ],
          },
          {
            name: "Data, Algorithms, and Machine Learning",
            standards: [
              {
                standard: "Explain how AI systems learn from data and use algorithms to make decisions.",
                outcomes: [
                  "Explain how algorithms guide AI behaviour through ordered and repeated steps.",
                  "Describe how AI systems use data to recognise patterns and classify information.",
                ],
              },
              {
                standard: "Explain how advanced AI models process information.",
                outcomes: [
                  "Identify the main parts of a neural network.",
                  "Demonstrate how data moves through input, hidden, and output layers.",
                ],
              },
              {
                standard: "Analyse how AI systems generate new outputs using patterns learned from data.",
                outcomes: [
                  "Identify visual patterns used by AI systems to recognise faces.",
                  "Identify how voice assistants are trained with human data.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Explain how AI manipulates or creates media that may cause safety and security concerns.",
                outcomes: [
                  "Identify the difference between real and AI-generated content.",
                  "Introduce the risks of AI being used to manipulate media.",
                  "Describe how AI can help detect online threats but can also create new safety and privacy risks.",
                ],
              },
              {
                standard: "Explain how ethics, cultural values, and inclusion guide AI decision making.",
                outcomes: [
                  "Identify examples of bias in AI decisions caused by unbalanced or unfair data.",
                  "Demonstrate how improving data with fairer examples can reduce bias in AI outputs.",
                  "Examine how cultural values influence how AI systems are used.",
                  "Discuss potential issues that arise when AI ignores culture and values.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "AI Applications in Society and Industry",
            standards: [
              {
                standard: "Analyse how AI is applied across different sectors.",
                outcomes: [
                  "Describe how AI is used to improve transportation in real-life systems.",
                ],
              },
              {
                standard: "Evaluate how AI addresses global challenges by promoting sustainability, humanitarian aid, and social impact.",
                outcomes: [
                  "Identify ways AI can help solve global problems such as pollution, hunger, or safety.",
                ],
              },
            ],
          },
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI projects that address real-world problems or challenges.",
                outcomes: [
                  "Identify how different team roles relate to the fields or careers that shape AI tools.",
                  "Describe a simple real-world problem that an AI tool can help solve.",
                  "Use structured research to gather information about how AI tools are used to solve real-world problems.",
                  "Identify simple requirements for an AI tool that solves a real-world problem.",
                  "List existing possible solutions for an AI tool, using sketches or diagrams to show how the idea can work.",
                  "Select the most suitable AI tool for the identified problem.",
                  "Create a basic prototype or representation of an AI tool.",
                  "Evaluate the fairness and safety of the AI tool using guided criteria.",
                  "Improve the AI tool by making simple changes based on guided feedback.",
                  "Describe the problem, the solution idea, and how research informed the design of the AI tool through a simple presentation.",
                  "Organise team roles using real AI-related functions.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: "06",
    label: "Grade 6",
    domains: [
      {
        id: "foundations",
        name: "AI Foundations and Core Principles",
        description: "How AI systems work: human-made tools that follow instructions, learn from data, and use algorithms to make decisions.",
        strands: [
          {
            name: "Foundations and Fundamentals of AI",
            standards: [
              {
                standard: "Compare how artificial intelligence is similar to or different from humans.",
                outcomes: [
                  "Explain how AI systems learn to solve complex tasks compared to humans.",
                  "Compare how AI creativity differs from human creativity.",
                ],
              },
            ],
          },
          {
            name: "Data, Algorithms, and Machine Learning",
            standards: [
              {
                standard: "Explain how AI systems learn from data and use algorithms to make decisions.",
                outcomes: [
                  "Analyse how changing the rules in an algorithm changes the decisions an AI system makes.",
                  "Describe how labelled data is used to train AI systems through supervised learning.",
                  "Explain how AI systems identify patterns by grouping unlabelled data.",
                ],
              },
              {
                standard: "Explain how advanced AI models process information.",
                outcomes: [
                  "Differentiate between single-layer and multi-layer neural networks.",
                ],
              },
              {
                standard: "Evaluate AI model performance.",
                outcomes: [
                  "Describe how accuracy is measured in AI predictions.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Explain how ethics, cultural values, and inclusion guide AI decision making.",
                outcomes: [
                  "Explain what makes an AI decision ethical or unethical.",
                  "Analyse real-world cases where biased or incomplete data resulted in unethical AI outcomes.",
                ],
              },
              {
                standard: "Explain how AI manipulates or creates media that may cause safety and security concerns.",
                outcomes: [
                  "Explain how AI can generate false text, images, or videos.",
                  "Discuss safe and responsible practices when encountering AI-generated content.",
                ],
              },
            ],
          },
          {
            name: "AI Policies, and Accountability",
            standards: [
              {
                standard: "Identify how AI impacts privacy, accountability, and the protection of personal rights.",
                outcomes: [
                  "Explain how AI systems learn from personal data.",
                  "Discuss the risks of sharing personal information with AI systems.",
                  "Explain why rules and regulations are needed to guide AI behavior.",
                  "Identify who is responsible for the decisions and outcomes produced by AI systems.",
                ],
              },
              {
                standard: "Examine how AI is governed through national policies.",
                outcomes: [
                  "Compare how countries use and regulate AI differently.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "AI Applications in Society and Industry",
            standards: [
              {
                standard: "Analyse how AI is applied across different sectors.",
                outcomes: [
                  "Explain how AI supports services such as smart city systems, healthcare, and environmental protection.",
                ],
              },
              {
                standard: "Evaluate how AI addresses global challenges by promoting sustainability, humanitarian aid, and social impact.",
                outcomes: [
                  "Explain how AI contributes to creating smarter, safer, and more sustainable societies.",
                  "Evaluate the impact of AI solutions used to address community challenges.",
                ],
              },
            ],
          },
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI projects that address real-world problems or challenges.",
                outcomes: [
                  "Identify AI tools that can help solve a real-world problem.",
                  "Investigate existing AI-supported solutions to understand how AI tools address real-world problems.",
                  "Summarise research findings to show connections between the identified problem and potential AI solutions.",
                  "Identify the functional requirements for an AI solution based on the problem and research.",
                  "Compare multiple possible AI solution ideas, explaining how each uses real-world logic to address the problem.",
                  "Select a final AI solution that meets the identified requirements of the problem.",
                  "Design a simple model or prototype of an AI solution using appropriate tools.",
                  "Evaluate the usefulness and fairness of the AI solution using guided criteria.",
                  "Modify the AI solution by addressing identified strengths and weaknesses using feedback.",
                  "Explain the AI solution, how it works, and why it is useful through a refined project presentation.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: "07",
    label: "Grade 7",
    domains: [
      {
        id: "foundations",
        name: "AI Foundations and Core Principles",
        description: "How AI systems work: human-made tools that follow instructions, learn from data, and use algorithms to make decisions.",
        strands: [
          {
            name: "Foundations and Fundamentals of AI",
            standards: [
              {
                standard: "Compare how artificial intelligence is similar to or different from humans.",
                outcomes: [
                  "Identify tasks AI can do and tasks that need human values or intuition.",
                ],
              },
            ],
          },
          {
            name: "Data, Algorithms, and Machine Learning",
            standards: [
              {
                standard: "Explain how AI systems learn from data and use algorithms to make decisions.",
                outcomes: [
                  "Differentiate between supervised, unsupervised, and reinforcement learning in AI systems.",
                  "Explain how AI uses graphs and visual representations to identify patterns in data.",
                ],
              },
              {
                standard: "Explain how advanced AI models process information.",
                outcomes: [
                  "Examine applications of deep learning neural networks.",
                ],
              },
              {
                standard: "Evaluate AI model performance.",
                outcomes: [
                  "Examine how accuracy is used to evaluate AI models.",
                ],
              },
              {
                standard: "Analyse how AI systems generate new outputs using patterns learned from data.",
                outcomes: [
                  "Explain how AI systems use personal behavior data to make predictions.",
                  "Explain how AI systems suggest content based on user interests and choices.",
                  "Explain how machines process human language.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Explain how ethics, cultural values, and inclusion guide AI decision making.",
                outcomes: [
                  "Differentiate between accuracy and fairness in AI systems.",
                  "Discuss ethical trade-offs when AI systems make decisions about people.",
                  "Analyse how cultural bias in datasets and design influences AI behavior and outcomes.",
                ],
              },
              {
                standard: "Explain how AI manipulates or creates media that may cause safety and security concerns.",
                outcomes: [
                  "Explain how AI tools can alter or manipulate audio, video, and images to change or misrepresent information.",
                  "Identify ways to detect AI-generated or manipulated media.",
                ],
              },
            ],
          },
          {
            name: "AI Policies, and Accountability",
            standards: [
              {
                standard: "Identify how AI impacts privacy, accountability, and the protection of personal rights.",
                outcomes: [
                  "Discuss how AI is used in law enforcement and courts",
                  "Analyse the benefits and risks of using AI in law enforcement.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "AI Applications in Society and Industry",
            standards: [
              {
                standard: "Analyse how AI is applied across different sectors.",
                outcomes: [
                  "Examine how national AI strategies shape productivity, wellbeing, and future development in the UAE.",
                ],
              },
              {
                standard: "Evaluate how AI addresses global challenges by promoting sustainability, humanitarian aid, and social impact.",
                outcomes: [
                  "Determine how AI is used to support disaster response, emergency services, and humanitarian efforts.",
                ],
              },
            ],
          },
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI projects that address real-world problems or challenges.",
                outcomes: [
                  "Develop a team plan that organises responsibilities needed to begin planning a small AI-based project.",
                  "Describe a real-world issue, including ethical risks the AI solution must address.",
                  "Use structured research to understand the feasibility, risks, limitations, and ethical impacts of existing AI solutions.",
                  "Identify functional requirements and basic constraints, including responsible-use considerations, for a small AI-based project.",
                  "Evaluate multiple existing AI solutions considering feasibility, risks, and ethical implications.",
                  "Select a final AI solution that best balances effectiveness, feasibility, and ethical responsibility.",
                  "Develop a prototype of an AI solution in response to testing results and ethical considerations.",
                  "Assess whether the final AI solution is safe, fair, private, and useful, using a structured checklist.",
                  "Modify the AI prototype based on results and feedback from peers or users.",
                  "Develop a presentation that clearly outlines the problem, research findings, final solution, and ethical considerations of the AI project.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: "08",
    label: "Grade 8",
    domains: [
      {
        id: "foundations",
        name: "AI Foundations and Core Principles",
        description: "How AI systems work: human-made tools that follow instructions, learn from data, and use algorithms to make decisions.",
        strands: [
          {
            name: "Foundations and Fundamentals of AI",
            standards: [
              {
                standard: "Compare how artificial intelligence is similar to or different from humans.",
                outcomes: [
                  "Analyse how AI systems and humans approach tasks differently in perception, reasoning, problem-solving, and interaction.",
                ],
              },
            ],
          },
          {
            name: "Data, Algorithms, and Machine Learning",
            standards: [
              {
                standard: "Explain how AI systems learn from data and use algorithms to make decisions.",
                outcomes: [
                  "Analyse how missing, incorrect, or inconsistent data can introduce errors or bias during AI model training.",
                  "Use datasets of varying quality to observe their impact on AI model training results.",
                  "Explain why AI models must be tested using new data.",
                ],
              },
              {
                standard: "Evaluate AI model performance.",
                outcomes: [
                  "Explain how a confusion matrix is used to show different types of AI prediction errors.",
                  "Explain how precision measures how accurate an AI model's positive predictions are.",
                  "Explain how recall measures how well an AI model identifies all relevant cases.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Explain how ethics, cultural values, and inclusion guide AI decision making.",
                outcomes: [
                  "Identify ways AI systems can unintentionally discriminate.",
                  "Describe protections that help prevent discrimination in AI systems.",
                  "Explain how promoting diversity and inclusion can reduce discrimination in AI systems.",
                ],
              },
              {
                standard: "Explain how AI manipulates or creates media that may cause safety and security concerns.",
                outcomes: [
                  "Describe how AI can spread fake or misleading content like deepfakes.",
                  "Evaluate the ethical and societal impact of AI-generated text, images, or videos.",
                ],
              },
            ],
          },
          {
            name: "AI Policies, and Accountability",
            standards: [
              {
                standard: "Examine how AI is governed through national policies.",
                outcomes: [
                  "Explain how the UAE promotes ethical and responsible use of AI through national governance and regulation.",
                  "Describe how global organisations, governments, and companies influence the development and regulation of AI.",
                ],
              },
              {
                standard: "Identify how AI impacts privacy, accountability, and the protection of personal rights.",
                outcomes: [
                  "Examine the concept of explainability in AI systems.",
                  "Explain why accountability is important when AI systems make decisions that are difficult to interpret.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "AI Applications in Society and Industry",
            standards: [
              {
                standard: "Analyse how AI is applied across different sectors.",
                outcomes: [
                  "Assess how AI improves service systems in healthcare, transport, education, and government.",
                  "Investigate how AI is used in public safety systems such as crime detection and facial recognition.",
                  "Explain how AI-driven automation is transforming careers, work tasks, and productivity across industries.",
                ],
              },
              {
                standard: "Evaluate how AI addresses global challenges by promoting sustainability, humanitarian aid, and social impact.",
                outcomes: [
                  "Analyse the environmental impact of AI systems.",
                ],
              },
            ],
          },
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI projects that address real-world problems or challenges.",
                outcomes: [
                  "Explain the core stages in building an AI system (problem definition, data collection, training, evaluation, and deployment).",
                  "Design an interdisciplinary team plan that aligns responsibilities with the stages of building an AI system.",
                  "Define a UAE or global challenge that can be addressed using an AI system.",
                  "Investigate how AI systems address global challenges by examining their data, training, evaluation, and deployment decisions.",
                  "Specify technical and ethical requirements for an interdisciplinary AI project.",
                  "Evaluate existing AI solutions considering fairness, usability, and system-level implications.",
                  "Select a final AI solution that aligns with ethical principles, user needs, and system requirements.",
                  "Construct a prototype of an AI solution to address system behaviour, fairness, and usability.",
                  "Evaluate the ethical principles, usability goals, and system requirements of the AI solution using guided criteria.",
                  "Optimise the AI solution by refining it to better meet ethical principles, usability goals, and system requirements.",
                  "Create a presentation that clearly demonstrates how the AI solution contributes to addressing a UAE or global challenge.",
                ],
              },
            ],
          },
          {
            name: "Usage of AI Tools",
            standards: [
              {
                standard: "Use generative AI models to create new content.",
                outcomes: [
                  "Explain how generative AI models create new content by learning patterns from existing data.",
                  "Use a generative AI tool to produce content.",
                  "Compare multiple outputs generated by a generative AI tool to identify patterns, similarities, and differences.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: "09",
    label: "Grade 9",
    domains: [
      {
        id: "foundations",
        name: "AI Foundations and Core Principles",
        description: "How AI systems work: human-made tools that follow instructions, learn from data, and use algorithms to make decisions.",
        strands: [
          {
            name: "Foundations and Fundamentals of AI",
            standards: [
              {
                standard: "Analyse how AI systems work and how data and design choices affect their use and impact.",
                outcomes: [
                  "Analyse how different factors, including data quality, system design, and human decisions, affect AI performance and outcomes.",
                  "Identify the core components of an AI system.",
                  "Explain how logic-based AI systems use rules and reasoning for decision-making.",
                  "Explain how optimisation-based AI systems use objectives and constraints for solution selection.",
                  "Explain how machine-learning systems use data for pattern recognition and prediction.",
                ],
              },
            ],
          },
          {
            name: "Data, Algorithms, and Machine Learning",
            standards: [
              {
                standard: "Analyse how data characteristics influence decision-making in AI systems.",
                outcomes: [
                  "Analyse the characteristics of real datasets (size, completeness, balance, and relevance) used in AI systems.",
                  "Identify potential issues in datasets used for AI.",
                  "Explain how probability is used in algorithmic decision-making.",
                  "Analyse simple algorithmic decision processes involving logic, data, and probability.",
                ],
              },
              {
                standard: "Analyse how AI systems model human emotions and behaviour.",
                outcomes: [
                  "Examine how AI systems detect human emotions.",
                  "Examine how AI systems predict human behaviour or actions.",
                ],
              },
              {
                standard: "Analyse how AI systems use optimisation to pursue goals and the trade-offs this creates.",
                outcomes: [
                  "Explain how AI systems define goals for optimisation.",
                  "Explain how constraints shape optimisation decisions in AI systems.",
                  "Evaluate the impacts of optimisation trade-offs on AI performance and outcomes.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Enhance AI systems to align with societal expectations.",
                outcomes: [
                  "Identify examples of academic dishonesty, including plagiarism and the unauthorised or misleading use of AI tools.",
                  "Explain how representation in datasets can influence fairness in AI systems.",
                  "Explain how algorithmic bias in AI systems can reinforce social inequalities.",
                  "Explain strategies used in AI systems to reduce algorithmic bias.",
                  "Explain the key traits of trustworthy AI systems.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI solutions that address complex real-world problems using systematic design processes.",
                outcomes: [
                  "Demonstrate basic project-management skills by using tools such as Gantt charts.",
                  "Investigate a community-based problem using real-world data, considering responsible and ethical AI use.",
                  "Document research findings using visual tools such as mind maps.",
                  "Identify functional, technical, and ethical requirements for an AI tool using structured criteria.",
                  "Analyse multiple existing AI solutions using research, focusing on strengths, limitations, and trade-offs.",
                  "Create a final solution by modifying existing AI solutions aligned with project requirements using refined diagrams, flowcharts, schematics, mathematical models, or text.",
                  "Construct a prototype of an AI tool using rule-based logic or a basic AI platform.",
                  "Evaluate the fairness, privacy, and explainability of the designed AI tool using guided criteria.",
                  "Improve the AI tool prototype based on performance, requirements, and societal considerations.",
                  "Create a presentation using appropriate visual and verbal elements for a defined audience.",
                ],
              },
            ],
          },
          {
            name: "Usage of AI Tools",
            standards: [
              {
                standard: "Apply effective prompting strategies when using AI tools.",
                outcomes: [
                  "Identify the core capabilities of large language models (LLMs).",
                  "Identify the key limitations of large language models (LLMs).",
                  "Use prompting strategies for academic tasks, including research, reading comprehension, and study strategies.",
                  "Write clear prompts for accurate, safe, and relevant LLM outputs.",
                  "Modify prompts for improved AI output accuracy and relevance.",
                  "Apply prompting strategies to reduce academic risks, including misinformation, bias, and over-reliance on AI.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: "10",
    label: "Grade 10",
    domains: [
      {
        id: "foundations",
        name: "AI Foundations and Core Principles",
        description: "How AI systems work: human-made tools that follow instructions, learn from data, and use algorithms to make decisions.",
        strands: [
          {
            name: "Data, Algorithms, and Machine Learning",
            standards: [
              {
                standard: "Analyse how neural network design influences model performance.",
                outcomes: [
                  "Explain the relationship between neural networks and deep learning.",
                  "Explain how neural networks process data through layered structures.",
                  "Analyse how neural network structure (layers and connections) influences performance.",
                  "Examine the limitations of neural networks.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Enhance AI systems to align with societal expectations.",
                outcomes: [
                  "Analyse how user interface design choices can affect inclusivity, accessibility, and trust in AI systems.",
                  "Explain how human values guide the design of human-centred AI systems.",
                ],
              },
              {
                standard: "Examine how AI affects human expression, behaviour, and creativity.",
                outcomes: [
                  "Evaluate how AI-generated responses can influence user opinions and decisions.",
                  "Analyse how AI-generated content (text, images, or code) influences creativity and originality.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "AI Applications in Society and Industry",
            standards: [
              {
                standard: "Analyse the implications of artificial intelligence in human-AI collaboration across different sectors.",
                outcomes: [
                  "Analyse how human roles, skills, and responsibilities change when tasks are shared between people and AI or robotic systems.",
                  "Evaluate the trade-offs of human-AI collaboration for efficiency, safety, and decision-making.",
                  "Analyse how AI is used in healthcare, including diagnosis, predictive genetics, and personalised medicine.",
                  "Evaluate the trade-offs of using AI in healthcare services.",
                  "Explain how AI tools accelerate scientific research through data analysis, modelling, and simulation.",
                  "Analyse how AI systems shape digital media content.",
                  "Evaluate how AI-driven systems influence what content people see and share, shaping cultural expression.",
                  "Analyse the trade-offs of human-AI collaboration in shaping public discourse.",
                ],
              },
            ],
          },
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI solutions that address complex real-world problems using systematic design processes.",
                outcomes: [
                  "Develop a collaborative project plan that includes a section on relevant UAE AI initiatives and future career pathways.",
                  "Investigate a real-world problem that can be solved with AI, identifying key components and intended outcomes.",
                  "Document research findings outlining existing solutions' feasibility, risks, and ethical considerations.",
                  "Identify measurable technical specifications for an AI-supported solution based on the problem and research.",
                  "Compare multiple existing AI solutions using research evidence and structured decision-making frameworks, such as the SWOT analysis. Create a final solution by combining features from multiple existing AI solutions aligned with the technical requirements of the project. Develop an AI-supported solution based on defined technical requirements.",
                  "Evaluate the AI solution outcomes against technical requirements, UAE values, and fairness criteria.",
                  "Modify the AI solution prototype by balancing performance trade-offs against requirements and societal considerations.",
                  "Design a pitch and presentation tailored to a specific audience and purpose.",
                ],
              },
            ],
          },
          {
            name: "Usage of AI Tools",
            standards: [
              {
                standard: "Evaluate different AI tools in terms of accuracy, accessibility, strength and limitations",
                outcomes: [
                  "Compare multiple AI tools, including UAE-developed LLMs, for academic and real-world tasks.",
                  "Evaluate the strengths of AI tools, including output reliability, in academic and real-world contexts.",
                  "Evaluate the limitations of different AI tools in academic and real-world contexts.",
                ],
              },
              {
                standard: "Use AI tools to enhance work effectiveness in real-world contexts.",
                outcomes: [
                  "Use AI to support personal communication style.",
                  "Use AI to enhance leadership skills.",
                  "Identify strategies to maintain originality when using AI tools.",
                  "Use AI tools for managing tasks, including planning, organisation, productivity, and communication.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: "11",
    label: "Grade 11",
    domains: [
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Enhance AI systems to align with societal expectations.",
                outcomes: [
                  "Analyse barriers that different user groups may face when interacting with AI systems.",
                  "Analyse how accessibility barriers in AI systems can increase existing social inequalities.",
                  "Evaluate how AI design choices can improve access for diverse communities.",
                  "Apply inclusive design principles to improve AI solutions.",
                  "Analyse how bias in system design affects fairness in AI systems.",
                  "Analyse how bias in training data affects fairness in AI systems.",
                  "Analyse case studies of biased AI outcomes and their ethical impact on different communities.",
                  "Evaluate the effectiveness of strategies used to promote fairness in AI systems.",
                  "Identify blind spots in AI system designs that may lead to unintended outcomes.",
                  "Analyse how interactions between users and AI systems can reveal design weaknesses.",
                  "Evaluate potential risks associated with deploying AI systems in real-world contexts.",
                  "Recommend design improvements to enhance the trustworthiness of AI systems.",
                ],
              },
            ],
          },
          {
            name: "AI Policies, and Accountability",
            standards: [
              {
                standard: "Evaluate responsible AI use against AI governance frameworks.",
                outcomes: [
                  "Analyse how AI improves government performance through informed decision-making and efficient use of public resources.",
                  "Explain how different countries regulate AI in response to national strategic priorities.",
                  "Compare national AI policy approaches across selected countries and global organisations.",
                ],
              },
              {
                standard: "Evaluate the effectiveness of AI governance in ensuring responsible and trustworthy use of AI systems.",
                outcomes: [
                  "Analyse how explainability in AI systems supports accountable AI use.",
                  "Analyse the trade-offs between AI system performance and interpretability.",
                  "Explain how personal data is protected in AI systems using guidelines and policies.",
                  "Evaluate the risks to the public when AI systems lack data protection safeguards.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "AI Applications in Society and Industry",
            standards: [
              {
                standard: "Analyse the implications of artificial intelligence in human-AI collaboration across different sectors.",
                outcomes: [
                  "Analyse how AI systems are used to support decision-making in areas such as education, hiring, insurance, and immigration.",
                  "Analyse case studies showing how AI systems support decision-making across public and private sector contexts.",
                  "Explain how AI is used in cybersecurity threat management, including detection, prevention, and response.",
                  "Analyse the role of AI in infrastructure protection related to cybersecurity and public safety.",
                  "Analyse how AI is used in fraud detection.",
                  "Analyse how predictive tools are used in areas such as security, policing, and social services.",
                  "Evaluate the ethical implications of AI tools in public and private sectors.",
                ],
              },
            ],
          },
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI solutions that address complex real-world problems using systematic design processes.",
                outcomes: [
                  "Develop a collaborative project plan that includes scope, roles, milestones, constraints, and links to the UAE's future workforce needs in AI.",
                  "Analyse a real-world problem that can be solved using prompt engineering and large language models (LLMs).",
                  "Document research findings using digital tools for analysis and decision-making.",
                  "Identify system requirements covering functionality, constraints, and user needs.",
                  "Analyse existing AI solutions using diagrams, models, or mathematical representations.",
                  "Develop a final AI solution by modifying or combining existing solutions based on feasibility and performance evidence.",
                  "Integrate multiple components into an AI solution prototype aligned with defined requirements.",
                  "Evaluate the AI prototype by integrating stakeholder and peer feedback against ethical, technical, and impact criteria.",
                  "Improve the AI solution by refining prompts for clarity, ethical compliance, and usefulness.",
                  "Develop a presentation demonstrating how the prototype meets technical, ethical, and impact criteria.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    grade: "12",
    label: "Grade 12",
    domains: [
      {
        id: "responsible",
        name: "Responsible and Ethical AI",
        description: "Using AI safely, fairly and ethically: bias and fairness, media and privacy, plus policy, governance and accountability.",
        strands: [
          {
            name: "Ethics, Bias, and Fairness in AI",
            standards: [
              {
                standard: "Enhance AI systems to align with societal expectations.",
                outcomes: [
                  "Explain how AI systems can reflect the values embedded in their data, design, or use.",
                  "Analyse situations where AI decisions may conflict with cultural values.",
                  "Evaluate the importance of human judgement when AI outputs challenge ethical values.",
                  "Explain how AI systems can influence values such as justice, peace, and responsibility.",
                  "Analyse scenarios where AI use raises concerns about fairness or accountability.",
                  "Evaluate the role of responsible AI design and use in promoting social well-being.",
                  "Identify key international principles for ethical and responsible AI.",
                  "Compare international AI ethics principles with UAE values and national AI guidelines.",
                  "Evaluate how cultural and national values influence approaches to AI governance and use.",
                  "Explain why critical thinking is essential when using AI systems.",
                  "Assess the appropriateness of AI-generated outputs or recommendations using moral reasoning.",
                  "Justify decisions that balance AI assistance with human responsibility and ethical judgement.",
                ],
              },
            ],
          },
          {
            name: "AI Policies, and Accountability",
            standards: [
              {
                standard: "Evaluate responsible AI use against AI governance frameworks.",
                outcomes: [
                  "Apply responsible AI criteria (such as fairness, transparency, and data protection) to a given use case.",
                  "Design AI use guidelines that support responsible AI use.",
                  "Evaluate how AI knowledge and skills support future learning and career pathways.",
                ],
              },
              {
                standard: "Evaluate the effectiveness of AI governance in ensuring responsible and trustworthy use of AI systems.",
                outcomes: [
                  "Analyse how AI rules are established within national and international governance frameworks.",
                  "Evaluate how AI systems are monitored for compliance through auditing.",
                  "Analyse methods used to enhance AI explainability in advanced models.",
                  "Analyse how data governance affects accountability in AI systems.",
                  "Evaluate risks associated with poor data governance in large-scale AI systems.",
                  "Evaluate the role of AI auditing in ensuring responsible and trustworthy AI systems.",
                ],
              },
            ],
          },
        ],
      },
      {
        id: "applications",
        name: "AI Applications, Innovation, and Practice",
        description: "Where and how AI is used in the real world, and designing AI projects: sector applications, innovation projects, and hands-on use of AI tools.",
        strands: [
          {
            name: "AI Applications in Society and Industry",
            standards: [
              {
                standard: "Evaluate the influence of AI on economic development and social change.",
                outcomes: [
                  "Analyse how AI is transforming infrastructure, including transport, utilities, and logistical systems.",
                  "Analyse how AI-driven automation is reshaping labour markets and job roles.",
                  "Evaluate the importance of workforce readiness, including upskilling and lifelong learning, in response to AI-driven change.",
                  "Analyse how AI is transforming key UAE sectors, including energy and government services.",
                ],
              },
              {
                standard: "Evaluate the effectiveness of AI in addressing global challenges through humanitarian and environmental applications.",
                outcomes: [
                  "Analyse how AI is used in humanitarian contexts, such as disaster response and public health initiatives.",
                  "Explain how AI is used in environmental analysis, including monitoring, modelling, and prediction.",
                  "Evaluate the effectiveness of AI-based solutions for global problem-solving.",
                ],
              },
            ],
          },
          {
            name: "Innovation and Projects Design",
            standards: [
              {
                standard: "Design AI solutions that address complex real-world problems using systematic design processes.",
                outcomes: [
                  "Apply advanced project-management skills using AI tools for project task organisation.",
                  "Analyse a problem using research and design-thinking methods, considering user needs and potential solutions.",
                  "Apply prompting techniques for research and deeper understanding of the problem.",
                  "Document project findings using advanced digital tools.",
                  "Translate system requirements into a functional AI-enabled design using LLMs or other AI tools.",
                  "Evaluate existing AI solutions using analytical or simulation-based approaches, with a focus on performance and impact.",
                  "Design a final AI solution by systematically combining or adapting existing solutions against defined criteria.",
                  "Create a functional working concept using LLMs or advanced AI tools.",
                  "Assess the ethical and social impact of the AI solution using LLMs or AI tools.",
                  "Improve the AI project through integration of technical, ethical, and societal evidence.",
                  "Develop a persuasive presentation tailored for judges, educators, and peers.",
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

export function getGrade(grade: string): CurriculumGrade | undefined {
  return curriculum.find((g) => g.grade === grade);
}

