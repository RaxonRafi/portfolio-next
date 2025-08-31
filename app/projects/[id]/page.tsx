import { projects } from "@/data/projects";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github } from "lucide-react";

interface Props {
  params: { id: string };
}

export default function ProjectDetails({ params }: Props) {
  const project = projects.find((p) => p.id === Number(params.id));

  if (!project) return <p className="text-center py-20">Project not found</p>;

  return (
    <section className="py-20 container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag, i) => (
          <Badge key={i} variant="secondary">
            {tag}
          </Badge>
        ))}
      </div>
      {typeof project.image === "string" ? (
        <img
          src={project.image}
          alt={project.title}
          className="w-full rounded-md object-cover aspect-video mb-6"
        />
      ) : (
        <Image
          src={project.image}
          alt={project.title}
          width={1200}
          height={800}
          className="w-full rounded-md object-cover mb-6"
        />
      )}
      <p className="text-muted-foreground mb-6">{project.fullDescription}</p>

      <div className="space-y-4 mb-6">
        <h4 className="font-semibold">Key Features:</h4>
        <ul className="list-disc list-inside text-muted-foreground space-y-2">
          {project.features.map((feature, i) => (
            <li key={i}>{feature}</li>
          ))}
        </ul>
      </div>

      <div className="flex gap-4">
        <Button variant="outline" asChild>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
            <Github className="h-4 w-4 mr-2" />
            View Code
          </a>
        </Button>
        <Button asChild>
          <a href={project.demoLink} target="_blank" rel="noopener noreferrer">
            <ExternalLink className="h-4 w-4 mr-2" />
            Live Demo
          </a>
        </Button>
      </div>
    </section>
  );
}
