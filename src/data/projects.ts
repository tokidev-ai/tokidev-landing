export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  color: string;
  link: string;
}

export const featuredProject: Project = {
  id: "01",
  title: "solveOS",
  subtitle: "distributed problem solving",
  description: "A distributed operating system framework for real-time problem solving. Built with Rust and WebAssembly to enable high-performance compute in browser environments.",
  tech: ["RUST", "WASM", "REDIS"],
  color: "#FA743F",
  link: "https://solveos-app.netlify.app/"
};
