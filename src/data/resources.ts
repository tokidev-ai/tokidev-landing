export interface FreeResource {
  id: string;
  label: string;
  rotate: string;
  delay: string;
  top: string;
  left: string;
  isFeatured?: boolean;
}

export const freeResources: FreeResource[] = [
  { id: "clean-arch", label: "Clean Architecture", rotate: "rotate-6", delay: "0s", top: "top-[40px]", left: "left-[10px] sm:left-[20px]" },
  { id: "starter-fs", label: "Starter Fullstack", rotate: "-rotate-6", delay: "1.2s", top: "top-[10px]", left: "left-[200px] sm:left-[260px]" },
  { id: "perf-check", label: "Performance Checklist", rotate: "-rotate-3", delay: "0.6s", top: "top-[140px]", left: "left-[40px] sm:left-[80px]" },
  { id: "eng-notes", label: "Notas de Ingeniería", rotate: "rotate-3", delay: "1.8s", top: "top-[130px]", left: "left-[240px] sm:left-[300px]" },
  { id: "more-res", label: "+ 12 recursos más", rotate: "rotate-0", delay: "0.9s", top: "top-[260px]", left: "left-1/2 -translate-x-1/2 sm:left-[140px] sm:translate-x-0", isFeatured: true }
];
