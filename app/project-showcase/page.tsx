import { ProjectShowcase } from "@/components/ProjectShowcase";

interface Project {
  id: number;
  project_title: string;
  desc: string;
  thumbnail: string;
  tech_used: string[];
  key_features: string[];
  git_url: string;
  live_url: string;
  createdAt: string;
  updatedAt: string;
}

// Fetch projects with ISR
async function getProjects() {
  try {
    const baseUrl =
      process.env.NEXT_PUBLIC_BASE_API ||
      "https://muhammadrafi-portfolio-backend.vercel.app/api/v1";
    const res = await fetch(`${baseUrl}/project`, {
      next: {
        revalidate: 60, // Revalidate at most every 60 seconds
      },
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch projects: ${res.status}`);
    }

    const projects = await res.json();
    return Array.isArray(projects) ? projects : projects.data || [];
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
}

export default async function ProjectShowcasePage() {
  const projects = await getProjects();

  return (
    <div className="min-h-screen">
      <ProjectShowcase projects={projects} />
    </div>
  );
}
