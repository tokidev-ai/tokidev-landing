export interface Talk {
  id: number;
  monthYear: string;
  day: string;
  attendees: string;
  venue: string;
  organizer: string;
  event: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
}

export const talks: Talk[] = [
  {
    id: 1,
    monthYear: "ABRIL 2026",
    day: "16",
    attendees: "+100 asistentes",
    venue: "Edificio Jala",
    organizer: "GDG Cochabamba",
    event: "Road to Build with AI — Kickoff",
    title: "SolveOS",
    subtitle: "Framework / metodología para que humanos y agentes de IA trabajen juntos de forma más estructurada.",
    description: "El 16 de abril de 2026 compartí mi charla sobre SolveOS como parte del evento Road to Build with AI – Kickoff, organizado por GDG Cochabamba en el Edificio Jala, con más de 100 asistentes interesados en explorar cómo la inteligencia artificial está cambiando la forma en que construimos productos y resolvemos problemas.",
    tags: ["SolveOS", "IA + Humanos", "GDG Cochabamba", "Speaking", "+100 personas"]
  },
  {
    id: 2,
    monthYear: "NOV 2025",
    day: "12",
    attendees: "+250 asistentes",
    venue: "Centro de Convenciones",
    organizer: "DevFest Bolivia 2025",
    event: "Keynote de Cierre — Inteligencia Artificial",
    title: "High-Performance Compute with Rust & WASM",
    subtitle: "Cómo ejecutar cargas de trabajo de IA pesadas directamente en el navegador del cliente a velocidad nativa.",
    description: "Una inmersión profunda en la compilación de bibliotecas de Rust a WebAssembly para acelerar la inferencia de modelos locales sin depender de servidores costosos, optimizando latencia a menos de 50ms.",
    tags: ["Rust", "WASM", "DevFest", "AI Performance", "Keynote"]
  },
  {
    id: 3,
    monthYear: "SEP 2025",
    day: "08",
    attendees: "+180 asistentes",
    venue: "Auditorio Principal UCBC",
    organizer: "JS Conf Latam",
    event: "Track de Arquitectura Frontend",
    title: "Modern Micro-frontends & Astro 5",
    subtitle: "Patrones de arquitectura para escalar landings de ultra-alto rendimiento manteniendo 100 en Lighthouse.",
    description: "Compartí estrategias de renderizado híbrido e islas de interactividad usando Astro, reduciendo el tamaño del paquete JavaScript del cliente a prácticamente cero sin perder animaciones dinámicas.",
    tags: ["Astro", "Micro-frontends", "Performance", "Clean Code"]
  }
];
