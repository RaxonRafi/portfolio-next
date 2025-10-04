"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EditProjectModal from "../Modals/UpdateProjectModal";
import DeleteProjectModal from "../Modals/DeleteProjectModal";

interface Project {
  id: number;
  project_title: string;
  tech_used: string[];
  desc: string;
  key_features: string[];
  thumbnail: string;
  git_url: string;
  live_url: string;
  createdAt: string;
  updatedAt: string;
}

const API_URL = `${process.env.NEXT_PUBLIC_BASE_API}/project`;
const ITEMS_PER_PAGE = 3;

const ProjectsTable = ({
  className,
  ...props
}: React.ComponentProps<"div">) => {
  const [allProjects, setAllProjects] = useState<Project[]>([]); // Stores all fetched projects
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState<Project | null>(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const openDelete = (p: Project) => {
    setDeletingProject(p);
    setIsDeleteOpen(true);
  };

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data: Project[] = await response.json();
      setAllProjects(data);
    } catch (e: any) {
      console.error("Fetching projects failed:", e);
      setError("Failed to load projects. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const totalPages = Math.ceil(allProjects.length / ITEMS_PER_PAGE);

  const projectsOnCurrentPage = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allProjects.slice(startIndex, endIndex);
  }, [allProjects, currentPage]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const formatTechUsed = (techArray: string[]) => {
    return techArray.join(", ");
  };

  if (loading) {
    return (
      <div
        className={cn("w-full max-w-4xl mx-auto text-center py-10", className)}
      >
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "w-full max-w-4xl mx-auto text-center py-10 text-red-500",
          className
        )}
      >
        <p>{error}</p>
      </div>
    );
  }

  const openEdit = (p: Project) => {
    setEditingProject(p);
    setIsEditOpen(true);
  };
  // --- Component Render ---
  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Projects</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>
              A list of your recent projects. Showing{" "}
              {projectsOnCurrentPage.length} of {allProjects.length} projects.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Thumbnail</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Tech Used</TableHead>
                <TableHead>Live Link</TableHead>
                <TableHead>Git Link</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projectsOnCurrentPage.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No projects found on this page.
                  </TableCell>
                </TableRow>
              ) : (
                projectsOnCurrentPage.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell>
                      <Image
                        src={project.thumbnail}
                        alt={`Thumbnail for ${project.project_title}`}
                        width={100}
                        height={50}
                        className="object-cover rounded-md"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      {project.project_title}
                    </TableCell>
                    <TableCell>{formatTechUsed(project.tech_used)}</TableCell>
                    <TableCell>
                      <Link
                        href={project.live_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="link" className="p-0 h-auto">
                          Live
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell>
                      <Link
                        href={project.git_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button variant="link" className="p-0 h-auto">
                          GitHub
                        </Button>
                      </Link>
                    </TableCell>
                    <TableCell className="text-right flex gap-2 justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openEdit(project)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => openDelete(project)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* --- Pagination Controls --- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between space-x-2 py-4 px-2">
          <Button
            variant="outline"
            size="sm"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <div className="flex-1 text-sm text-muted-foreground text-center">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
      {/* EDIT MODAL */}
      <EditProjectModal
        open={isEditOpen}
        onOpenChange={setIsEditOpen}
        project={editingProject}
        onUpdated={() => {
          fetchProjects();
        }}
      />
      <DeleteProjectModal
        open={isDeleteOpen}
        onOpenChange={setIsDeleteOpen}
        project={deletingProject}
        onDeleted={() => {
          fetchProjects();
        }}
      />
    </div>
  );
};

export default ProjectsTable;
