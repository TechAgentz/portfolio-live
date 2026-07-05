export const profile = {
  name: "Mohamed Shahin M",
  role: "Freelance Full-Stack Developer",
  tagline: "Dynamics 365 CRM & full-stack development",
  // Short hero line — kept intentionally simple.
  intro:
    "I work across Dynamics 365 CRM and full-stack web & mobile development.",
  location: "India",
  phone: "+91 8113003220",
  email: "shahinmohamed411@gmail.com",
  linkedin: "https://www.linkedin.com/in/mohamedshahinm",
  // Leave empty to show a clean "MS" monogram placeholder.
  // Paste your own photo URL (or "/your-photo.jpg" from /public) to use a real photo.
  photo: "/portrait.png",
  summary:
    "Freelance developer specializing in Microsoft Dynamics 365 CRM and full-stack web & mobile development. I build custom CRM solutions on the Power Platform — Power Pages portals, Power Automate flows, and Azure integrations — and ship end-to-end web and mobile apps with React, Node.js, and Flutter. I enjoy turning complex requirements into clean, maintainable products.",
};

export const stats = [
  { value: "3+", label: "Years building software" },
  { value: "6", label: "Projects showcased" },
  { value: "3", label: "Microsoft certifications" },
  { value: "10+", label: "Technologies" },
];

export const services = [
  "Dynamics 365 & Power Platform",
  "Full-Stack Web (React / Node)",
  "Mobile Apps (Flutter)",
  "Cloud & API Integrations",
];

export const competencies = [
  {
    title: "CRM & Platform",
    accent: "blue" as const,
    skills: [
      "Microsoft Dynamics 365 CRM",
      "Dataverse",
      "Power Pages",
      "Power Automate",
      "Power BI",
      "Power Platform",
      "Ribbon Workbench",
      "XrmToolBox",
    ],
  },
  {
    title: "Cloud & Integration",
    accent: "green" as const,
    skills: [
      "Azure Functions (C#)",
      "Azure Key Vault",
      "REST APIs",
      "DocuSign Integration",
      "eSignature (Emsign)",
      "OAuth2 / SSO",
    ],
  },
  {
    title: "Development",
    accent: "blue" as const,
    skills: [
      "Flutter (iOS & Android)",
      "JavaScript",
      "Liquid Templates",
      "C#",
      "ReactJS",
      "Node.js",
      "SQL",
      "MongoDB",
      "Git",
    ],
  },
  {
    title: "Methodology",
    accent: "green" as const,
    skills: [
      "Requirements Analysis",
      "UAT",
      "System Integration",
      "DEV-to-UAT Migration",
      "Functional Consulting",
    ],
  },
];

export const marqueeSkills = [
  "Dynamics 365",
  "Power Platform",
  "Power Pages",
  "Power Automate",
  "Power BI",
  "Azure Functions",
  "Dataverse",
  "Flutter",
  "React",
  "Node.js",
  "C#",
  "DocuSign",
  "OAuth2 / SSO",
  "MongoDB",
];

/**
 * Selected work, reframed from real projects you've built.
 * Add `link` (live demo / GitHub) and `image` ("/work/xyz.png" in /public)
 * to any project to surface a button / thumbnail — omit them to hide.
 */
export const projects = [
  {
    title: "Marina Management Portal",
    category: "Dynamics 365 · Power Pages",
    accent: "blue" as const,
    description:
      "Customer portal on Power Pages with dynamic Liquid/JavaScript data binding, interactive SVG marina maps that color berths from real-time CRM status, and multi-contract popup support.",
    tags: ["Power Pages", "Liquid", "JavaScript", "Dataverse", "Dynamics 365"],
    link: "",
  },
  {
    title: "DocuSign Contract Automation",
    category: "Cloud Integration",
    accent: "green" as const,
    description:
      "Azure Functions middleware (C#) integrating Dynamics 365 with DocuSign for end-to-end contract-signing automation, with secure secret management via Azure Key Vault.",
    tags: ["C#", "Azure Functions", "Key Vault", "REST API", "DocuSign"],
    link: "",
  },
  {
    title: "Power BI Operations Dashboard",
    category: "Analytics",
    accent: "blue" as const,
    description:
      "Operational dashboards using DirectQuery against Dataverse with OAuth2/SSO and Row-Level Security, embedded directly inside Dynamics 365 for management reporting.",
    tags: ["Power BI", "Dataverse", "OAuth2 / SSO", "DAX"],
    link: "",
  },
  {
    title: "Marina Mobile App",
    category: "Mobile · Flutter",
    accent: "green" as const,
    description:
      "Cross-platform Flutter app (iOS & Android) integrated with Dataverse REST APIs for customer onboarding, berth booking, and day-to-day operational workflows.",
    tags: ["Flutter", "Dart", "Dataverse", "REST API"],
    link: "",
  },
  {
    title: "HYZ-Business Platform",
    category: "Full-Stack Web",
    accent: "blue" as const,
    description:
      "Full-stack features for a business platform — responsive ReactJS front-end, scalable Node.js services and RESTful APIs, and optimized MongoDB schemas.",
    tags: ["React", "Node.js", "MongoDB", "REST API"],
    link: "",
  },
  {
    title: "BookStore E-Commerce",
    category: "Full-Stack Web · MERN",
    accent: "green" as const,
    description:
      "Full-featured MERN e-commerce app for book sales with complete CRUD operations, a RESTful API architecture, and a production-ready UI.",
    tags: ["MongoDB", "Express", "React", "Node.js"],
    link: "",
  },
];

export const certifications = [
  {
    title: "Power BI Data Analyst Associate",
    issuer: "Microsoft Certified",
    code: "PL-300",
  },
  {
    title: "Power Platform Developer Associate",
    issuer: "Microsoft Certified",
    code: "PL-400",
  },
  {
    title: "Power Platform Fundamentals",
    issuer: "Microsoft Certified",
    code: "PL-900",
  },
];

export const experience = [
  {
    title: "Associate CRM Consultant",
    period: "2024 — Present",
    company: "Maxcient Technologies",
    location: "Bengaluru, India (HQ: Dubai, UAE)",
    bullets: [
      "Delivered end-to-end Dynamics 365 CRM implementations for enterprise clients in Marina Management and Financial Services, covering full project lifecycle from requirements gathering to UAT and go-live support",
      "Architected and deployed Power Pages customer portals with dynamic Liquid/JavaScript-driven data binding, SVG marina maps with real-time CRM berth color logic, and multi-contract popup support",
      "Engineered Azure Functions middleware (C#) integrating Dynamics 365 with DocuSign for end-to-end contract signing automation, with secure secret management via Azure Key Vault",
      "Designed NationalBonds eSignature integration using Emsign (on-premise) across a VPN/PAM network architecture, producing C# Azure Functions skeletons and detailed effort estimations",
      "Built Power BI operational dashboards using DirectQuery against Dataverse with OAuth2/SSO and Row-Level Security embedded within Dynamics 365 CRM for management reporting",
      "Configured Ribbon Workbench in XrmToolBox to manage CRM button visibility on contract entities using OrRule/ValueRule logic aligned to status-driven business workflows",
      "Managed full DEV-to-UAT migration of DocuSign/Dynamics 365/Azure Functions integration, including Azure IAM configuration, Key Vault setup, and Power Automate Connection Reference management",
      "Developed a Flutter mobile application (iOS & Android) integrated with Dataverse REST APIs, enabling customer onboarding, berth booking, and operational workflows across platforms",
      "Collaborated closely with business stakeholders to perform requirements analysis, system design, UAT support, and post-deployment optimization",
    ],
  },
  {
    title: "Assistant Software Engineer",
    period: "2023 — 2024",
    company: "Hyz Ventures Pvt. Ltd.",
    location: "",
    bullets: [
      "Contributed as a core developer on the HYZ-Business platform, delivering features across the full stack within a collaborative team environment",
      "Built responsive, high-performance front-end interfaces using ReactJS, improving user experience and application usability",
      "Developed scalable Node.js backend services and RESTful APIs, enabling seamless data exchange across platform modules",
      "Designed and optimized MongoDB database schemas to support efficient data storage, retrieval, and application scalability",
      "Actively participated in sprint planning, code reviews, and cross-functional collaboration to ensure consistent on-time delivery",
    ],
  },
  {
    title: "MERN Full Stack Intern",
    period: "2023",
    company: "Futura Labs",
    location: "",
    bullets: [
      "Designed and developed a full-featured e-commerce web application for book sales using the MERN stack (MongoDB, Express, ReactJS, Node.js)",
      "Implemented complete CRUD operations, RESTful API architecture, and front-end UI, delivering a production-ready application",
      "Applied performance optimization techniques to ensure scalability and maintainability",
    ],
  },
];

export const education = [
  {
    degree: "B.Tech — Electrical & Electronics Engineering",
    school: "Ponnaiyah Ramajayam Institute of Science and Technology, Thanjavur",
    period: "June 2022",
    detail: "CGPA: 7.5 / 10.00",
  },
  {
    degree: "Higher Secondary, Class XII",
    school: "Kerala Higher Secondary Education Board",
    period: "April 2018",
    detail: "",
  },
  {
    degree: "SSLC, Class X",
    school: "Kerala Board of Public Examinations",
    period: "March 2015",
    detail: "",
  },
];
