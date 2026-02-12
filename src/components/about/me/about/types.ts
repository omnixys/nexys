export type SkillCategory =
  | "Language"
  | "Frontend"
  | "Backend"
  | "Database"
  | "DevOps"
  | "Messaging"
  | "Tooling"
  | "Design";

  export const categoryLabels: Record<string, string> = {
    Language: "Languages",
    Frontend: "Frontend",
    Backend: "Backend",
    Database: "Databases",
    Messaging: "Messaging",
    DevOps: "DevOps & Infrastructure",
    Tooling: "Tooling",
    Design: "Design",
  };

export type Skill = {
  label: string;
  category: SkillCategory;
  description: string;
  icon?: React.ReactNode;
  image?: string;
};
