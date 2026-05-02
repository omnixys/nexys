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
