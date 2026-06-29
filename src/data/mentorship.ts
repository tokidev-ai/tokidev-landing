export interface MentorshipTrack {
  id: string;
  iconLabel: string;
  title: string;
  description: string;
  duration: string;
}

export const mentorshipTracks: MentorshipTrack[] = [
  {
    id: "fullstack",
    iconLabel: "</>",
    title: "Fullstack Foundations",
    description: "Arquitectura limpia, APIs sólidas y frontend que rinde. Las bases que te llevan de junior a mid con criterio.",
    duration: "8 SEMANAS · 1:1"
  },
  {
    id: "system-design",
    iconLabel: "{ }",
    title: "System Design & Arquitectura",
    description: "Diseña sistemas de alto rendimiento: escalabilidad, modelado de datos y trade-offs reales de producción.",
    duration: "6 SEMANAS · 1:1"
  },
  {
    id: "ai-agents",
    iconLabel: "AI",
    title: "AI Automation & Agentes",
    description: "Integra IA y agentes en productos reales: del prototipo al deploy con estándares de ingeniería.",
    duration: "6 SEMANAS · 1:1"
  }
];
