"use client";

import { deletePost } from "@/actions/mutation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

interface Blog {
  id: number;
  title: string;
  content: string;
  thumbnail: string;
  isFeatured: boolean;
  tags: string[];
  slug: string;
  views: number;
  authorId: number;
  createdAt: string;
  updatedAt: string;
}

export default function DeleteBlogModal({
  open,
  onOpenChange,
  blog,
  onDeleted,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  blog: Blog | null;
  onDeleted: () => void; // callback to refetch blogs
}) {
  const [isDeleting, setIsDeleting] = useState(false);

  if (!blog) return null;

  const handleDelete = async () => {
    try {
      setIsDeleting(true);

      // Use server action to delete the post
      const result = await deletePost(blog.id);

      if (result?.error) {
        throw new Error(result.error);
      }

      toast.success(`Blog "${blog.title}" deleted successfully`);
      onDeleted();
      onOpenChange(false);
    } catch (error: any) {
      toast.error("Delete failed", {
        description: error?.message || "Unknown error",
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Delete Blog</DialogTitle>
        </DialogHeader>
        <p className="text-sm text-muted-foreground">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{blog.title}</span>? This action
          cannot be undone.
        </p>
        <DialogFooter className="flex justify-end gap-2 mt-4">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isDeleting}
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            {isDeleting ? "Deleting..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
