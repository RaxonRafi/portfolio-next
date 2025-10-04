"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ExternalLink, Github, Plus, Upload, X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export interface Project {
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

interface ProjectFormData {
  project_title: string;
  desc: string;
  git_url: string;
  live_url: string;
  tech_used: string[];
  key_features: string[];
  thumbnail: File | null;
}

export default function UpdateProjectForm({
  project,
  onSuccess,
  className,
  ...props
}: {
  project: Project;
  onSuccess: () => void; // caller closes modal + refreshes list
} & React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(
    project.thumbnail || null
  );

  const form = useForm<ProjectFormData>({
    defaultValues: {
      project_title: project.project_title,
      desc: project.desc,
      git_url: project.git_url,
      live_url: project.live_url,
      tech_used: project.tech_used || [],
      key_features: project.key_features || [],
      thumbnail: null,
    },
  });

  const addTechnology = () => {
    const val = techInput.trim();
    if (!val) return;
    const list = form.getValues("tech_used");
    if (!list.includes(val)) form.setValue("tech_used", [...list, val]);
    setTechInput("");
  };
  const removeTechnology = (t: string) => {
    form.setValue(
      "tech_used",
      form.getValues("tech_used").filter((x) => x !== t)
    );
  };
  const addFeature = () => {
    const val = featureInput.trim();
    if (!val) return;
    const list = form.getValues("key_features");
    if (!list.includes(val)) form.setValue("key_features", [...list, val]);
    setFeatureInput("");
  };
  const removeFeature = (f: string) => {
    form.setValue(
      "key_features",
      form.getValues("key_features").filter((x) => x !== f)
    );
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("thumbnail", file);
      const reader = new FileReader();
      reader.onload = () => setThumbnailPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    try {
      setIsLoading(true);

      const payload = {
        project_title: data.project_title,
        desc: data.desc,
        git_url: data.git_url,
        live_url: data.live_url,
        tech_used: data.tech_used,
        key_features: data.key_features,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (data.thumbnail) formData.append("thumbnail", data.thumbnail);

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/project/${project.id}`,
        { method: "PATCH", body: formData }
      );
      if (!res.ok) {
        const msg = await res.text().catch(() => "");
        throw new Error(msg || "Failed to update project");
      }

      toast.success("Project updated successfully!");
      onSuccess();
    } catch (err: any) {
      toast.error("Update failed", {
        description: err?.message || "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full", className)} {...props}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="project_title"
            rules={{ required: "Project title is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Project Title</FormLabel>
                <FormControl><Input {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="desc"
            rules={{ required: "Description is required" }}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormField
              control={form.control}
              name="git_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <Github className="h-4 w-4" /> GitHub URL
                  </FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="live_url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-2">
                    <ExternalLink className="h-4 w-4" /> Live URL
                  </FormLabel>
                  <FormControl><Input {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Tech Used */}
          <div className="space-y-3">
            <FormLabel>Technologies Used</FormLabel>
            <div className="flex gap-2">
              <Input
                placeholder="Add a technology"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTechnology())}
              />
              <Button type="button" variant="outline" onClick={addTechnology}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.watch("tech_used").map((t) => (
                <Badge key={t} variant="secondary" className="flex items-center gap-1">
                  {t}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeTechnology(t)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Key Features */}
          <div className="space-y-3">
            <FormLabel>Key Features</FormLabel>
            <div className="flex gap-2">
              <Input
                placeholder="Add a feature"
                value={featureInput}
                onChange={(e) => setFeatureInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addFeature())}
              />
              <Button type="button" variant="outline" onClick={addFeature}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.watch("key_features").map((f) => (
                <Badge key={f} variant="outline" className="flex items-center gap-1">
                  {f}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeFeature(f)} />
                </Badge>
              ))}
            </div>
          </div>

          {/* Thumbnail */}
          <div className="space-y-3">
            <FormLabel>Project Thumbnail</FormLabel>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
              <input
                type="file"
                accept="image/*"
                className="hidden"
                id="update-thumb"
                onChange={handleThumbnailChange}
              />
              <label htmlFor="update-thumb" className="cursor-pointer">
                {thumbnailPreview ? (
                  <div className="space-y-2">
                    <img src={thumbnailPreview} alt="preview" className="mx-auto max-h-40 rounded-lg" />
                    <p className="text-sm text-muted-foreground">Click to change image</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <p className="text-sm text-muted-foreground">Click to upload thumbnail image</p>
                  </div>
                )}
              </label>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Project"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
