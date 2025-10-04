"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import Link from "next/link";
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

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/project`, {
          next: {
            revalidate: 60, // Revalidate at most every 60 seconds
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch projects: ${res.status}`);
        }

        const data = await res.json();
        const projectsData = Array.isArray(data) ? data : data.data || [];
        setProjects(projectsData);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setError("Failed to load projects. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const scaleUp = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1 },
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/30" id="projects">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="h-6 w-24 bg-gray-200 rounded mb-4 mx-auto animate-pulse"></div>
            <div className="h-10 w-48 bg-gray-200 rounded mx-auto animate-pulse"></div>
            <div className="h-1 w-20 bg-gray-200 rounded mx-auto mt-4 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gray-200 rounded-lg h-64 animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-muted/30" id="projects">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-muted/30" id="projects">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">
            Projects
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground">
                No projects available at the moment.
              </p>
            </div>
          ) : (
            projects.map((project: Project) => (
              <Card
                key={project.id}
                className="cursor-pointer hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-0">
                  <img
                    src={project.thumbnail}
                    alt={`${project.project_title} project screenshot`}
                    className="w-full aspect-video object-cover"
                  />
                  <div className="p-4">
                    <h3 className="text-xl font-bold">
                      {project.project_title}
                    </h3>
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {project.desc}
                    </p>
                    <Link
                      href={`/projects/${project.id}`}
                      className="text-primary mt-2 inline-block font-semibold"
                    >
                      Learn More →
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
