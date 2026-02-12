export type Experience = {
  id: string;
  side: "left" | "right";
  title: string;
  company: string;
  date: string;
  description: string;
};

export const experiences: Experience[] = [
  {
    id: "vector",
    side: "left",
    title: "Software Development Intern",
    company: "Vector Informatik",
    date: "09/2025 – 02/2026",
    description:
      "Worked on the development and improvement of an internal desktop application using C# and WPF. Focused on clean architecture, extending existing features and understanding large, real-world codebases.",
  },
  {
    id: "lbbw",
    side: "right",
    title: "Working Student – IT Security",
    company: "LBBW",
    date: "10/2024 – 08/2025",
    description:
      "Supported IT security-related processes and gained insight into secure system environments. Learned to work responsibly within structured, regulated and professional IT landscapes.",
  },
  {
    id: "erhardt",
    side: "left",
    title: "Working Student – IT Department",
    company: "Erhardt Bürowelt",
    date: "09/2023 – 08/2024",
    description:
      "Worked closely with internal IT systems and users, building a solid understanding of operational IT processes, problem-solving and technical responsibility.",
  },
  {
    id: "omnixys",
    side: "right",
    title: "Founder & Developer",
    company: "Omnixys (Personal Project)",
    date: "2023 – Present",
    description:
      "Designing and building a modular software platform with frontend and backend services. Working with microservices, CI/CD pipelines and modern system architecture to deepen my understanding of complex software systems.",
  },
];
