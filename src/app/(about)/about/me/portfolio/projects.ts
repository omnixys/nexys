export interface PortfolioItem {
  id: number;
  title: string;
  desc: string;
  img: string;
  link: string;
  gradient: string;
  domain: "Platform" | "Security" | "Commerce" | "Finance" | "Travel";
}

export const ctaLabelByDomain: Record<string, string> = {
  Platform: "View Architecture",
  Security: "Explore System",
  Commerce: "View Platform",
  Finance: "View Domain",
  Travel: "View Project",
};

export const PROJECTS: PortfolioItem[] = [
  {
    id: 1,
    title: "Nexys",
    domain: "Platform",
    desc: "A modular platform core designed to support multiple domain-driven applications. Nexys focuses on clean architecture, scalability and long-term system design across frontend and backend services.",
    // img: "/projects/nexys.webp",
    img: "/logo/omnixys-original.png",
    link: "/projects/nexys",
    gradient: "linear-gradient(to right, #0f172a, #020617)",
  },
  {
    id: 2,
    title: "Checkpoint",
    domain: "Security",
    desc: "A secure, QR-based event, invitation and access management platform. Checkpoint enables controlled entry, real-time attendance tracking and fraud-resistant ticket handling for events of any scale.",
    // img: "/projects/checkpoint.webp",
    img: "/logo/omnixys-original.png",
    link: "/projects/checkpoint",
    gradient: "linear-gradient(to right, #020617, #020617)",
  },
  {
    id: 3,
    title: "Odera",
    domain: "Commerce",
    desc: "A commerce and ordering platform focused on structured product flows, purchasing logic and scalable order management. Odera explores clean domain separation and user-centric shopping experiences.",
    // img: "/projects/odera.webp",
    img: "/logo/omnixys-original.png",
    link: "/projects/odera",
    gradient: "linear-gradient(to right, #020617, #020617)",
  },
  {
    id: 4,
    title: "Finyx",
    domain: "Finance",
    desc: "A secure financial domain responsible for managing accounts, revision-safe transactions and invoice lifecycles. Finyx focuses on integrity, auditability and controlled access within online finance systems.",
    // img: "/projects/finyx.webp",
    img: "/logo/omnixys-original.png",
    link: "/projects/finyx",
    gradient: "linear-gradient(to right, #020617, #020617)",
  },
  {
    id: 5,
    title: "Routea",
    domain: "Travel",
    desc: "A travel and activity booking platform that unifies destinations, accommodations and experiences into a structured, mobile-first booking flow with a focus on clarity and usability.",
    // img: "/projects/routea.webp",
    img: "/logo/omnixys-original.png",
    link: "/projects/routea",
    gradient: "linear-gradient(to right, #020617, #020617)",
  },
];
