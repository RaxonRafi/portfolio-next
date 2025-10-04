"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

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

export default function ProjectDetails({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/project/${params.id}`,
          {
            next: {
              revalidate: 120, // Revalidate at most every 2 minutes
            },
          }
        );

        if (!res.ok) {
          if (res.status === 404) {
            notFound();
          }
          throw new Error(`Failed to fetch project: ${res.status}`);
        }

        const data = await res.json();
        setProject(data.data || data);
      } catch (error) {
        console.error("Error fetching project:", error);
        setError("Failed to load project. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [params.id]);

  if (loading) {
    return (
      <section className="py-20 container mx-auto px-4">
        <div className="animate-pulse">
          <div className="h-8 w-1/3 bg-gray-200 rounded mb-4"></div>
          <div className="flex gap-2 mb-6">
            <div className="h-6 w-16 bg-gray-200 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 rounded"></div>
            <div className="h-6 w-24 bg-gray-200 rounded"></div>
          </div>
          <div className="h-64 bg-gray-200 rounded mb-6"></div>
          <div className="space-y-2 mb-6">
            <div className="h-4 bg-gray-200 rounded w-full"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6"></div>
            <div className="h-4 bg-gray-200 rounded w-4/6"></div>
          </div>
          <div className="h-4 bg-gray-200 rounded w-1/4 mb-6"></div>
          <div className="flex gap-4">
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
            <div className="h-10 w-32 bg-gray-200 rounded"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 container mx-auto px-4">
        <div className="text-center py-12">
          <p className="text-red-500">{error}</p>
        </div>
      </section>
    );
  }

  if (!project) {
    notFound();
  }

  return (
    <section className="py-20 container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{project.project_title}</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tech_used.map((tech: string, i: number) => (
          <Badge key={i} variant="secondary">
            {tech}
          </Badge>
        ))}
      </div>
      <img
        src={project.thumbnail}
        alt={`${project.project_title} project screenshot`}
        className="w-full rounded-md object-cover aspect-video mb-6"
      />
      <p className="text-muted-foreground mb-6">{project.desc}</p>

      <div className="space-y-4 mb-6">
        <h4 className="font-semibold">Key Features:</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          {project.key_features.map((feature: string, i: number) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4">
        {project.git_url && (
          <Button variant="outline" asChild>
            <a href={project.git_url} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              View Code
            </a>
          </Button>
        )}
        {project.live_url && (
          <Button asChild>
            <a
              href={project.live_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Live Demo
            </a>
          </Button>
        )}
      </div>
    </section>
  );
}
