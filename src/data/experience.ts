export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  description: string;
  isCurrent: boolean;
  logoInitial: string;
  logoColor: string;
}

export const experiencesList: ExperienceItem[] = [
  {
    company: "Unosquare",
    role: "Senior Software Engineer",
    period: "2021 — PRESENT",
    description: "Leading enterprise transformation through scalable cloud architectures.",
    isCurrent: true,
    logoInitial: "U",
    logoColor: "from-[#FA743F] to-[#DA2984]"
  },
  {
    company: "NICE CXone",
    role: "Fullstack Engineer",
    period: "2019 — 2021",
    description: "Building real-time communication platforms for global enterprise.",
    isCurrent: false,
    logoInitial: "N",
    logoColor: "from-[#DA2984] to-[#A406E9]"
  },
  {
    company: "Special Tours",
    role: "Software Developer",
    period: "2017 — 2019",
    description: "Engineering complex booking engines for the European travel market.",
    isCurrent: false,
    logoInitial: "S",
    logoColor: "from-[#A406E9] to-[#5014A0]"
  }
];
