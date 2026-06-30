export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  isCurrent: boolean;
  logoInitial: string;
  logoColor: string;
  logoUrl?: string;
}

export const experiencesList: ExperienceItem[] = [
  {
    company: "Unosquare",
    role: "Senior Software Engineer",
    period: "2021 — PRESENT",
    description: "Leading enterprise transformation through scalable cloud architectures.",
    isCurrent: true,
    logoInitial: "U",
    logoColor: "from-[#FA743F] to-[#DA2984]",
    logoUrl: "https://res.cloudinary.com/dlppldpo1/image/upload/v1782783259/logounosquare_saavfy.jpg"
  },
  {
    company: "NICE CXone",
    role: "Fullstack Engineer",
    period: "2019 — 2021",
    description: "Building real-time communication platforms for global enterprise.",
    isCurrent: false,
    logoInitial: "N",
    logoColor: "from-[#DA2984] to-[#A406E9]",
    logoUrl: "https://res.cloudinary.com/dlppldpo1/image/upload/v1782783258/logonice_r8fh4t.webp"
  },
  {
    company: "McGraw-Hill",
    role: "Software Developer",
    period: "2017 — 2019",
    description: "Developing scalable educational platforms and services for global markets.",
    isCurrent: false,
    logoInitial: "M",
    logoColor: "from-[#A406E9] to-[#5014A0]",
    logoUrl: "https://res.cloudinary.com/dlppldpo1/image/upload/v1782783259/logomcgrayhill_pho06c.jpg"
  }
];
