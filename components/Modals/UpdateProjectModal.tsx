"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import UpdateProjectForm, { Project } from "../forms/UpdateProject";

export default function EditProjectModal({
  open,
  onOpenChange,
  project,
  onUpdated,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  project: Project | null;
  onUpdated: () => void; // re-fetch list in parent
}) {
  if (!project) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent 
        className="max-w-3xl max-h-[80vh] overflow-y-auto"
      >
        <DialogHeader>
          <DialogTitle>Edit: {project.project_title}</DialogTitle>
        </DialogHeader>

        <UpdateProjectForm
          project={project}
          onSuccess={() => {
            onUpdated();
            onOpenChange(false);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
