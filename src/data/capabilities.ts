export interface Capability {
  id: string;
  iconName: 'Zap' | 'Smartphone' | 'Bot' | 'TrendingUp';
  title: string;
  desc: string;
}

export interface Stat {
  value: string;
  label: string;
}

export const capabilitiesList: Capability[] = [
  {
    id: "high-perf",
    iconName: "Zap",
    title: "High Performance",
    desc: "Sub-100ms targets",
  },
  {
    id: "responsive",
    iconName: "Smartphone",
    title: "Responsive Design",
    desc: "Mobile-first always",
  },
  {
    id: "ai-auto",
    iconName: "Bot",
    title: "AI Automation",
    desc: "Cursor & n8n",
  },
  {
    id: "learning",
    iconName: "TrendingUp",
    title: "Always Learning",
    desc: "New stack monthly",
  }
];

export const statsList: Stat[] = [
  { value: "2+", label: "YEARS" },
  { value: "11+", label: "PROJECTS" },
  { value: "20+", label: "TECH" },
  { value: "∞", label: "COFFEE" }
];
