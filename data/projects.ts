import { StaticImageData } from "next/image";

export interface Project {
  id: number;
  project_title: string;
  shortDescription: string;
  description: string;
  image: string | StaticImageData;
  tags: string[];
  features: string[];
  demoLink: string;
  githubLink: string;
  fullDescription: string;
}

// Note: This data is no longer used as we're fetching from the API
// Keeping the interface for type safety
export const projects: Project[] = [];
