/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { createProject } from "@/actions/create";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { ExternalLink, Github, Plus, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { RichTextEditor } from "@/components/RichTextEditor";

interface ProjectFormData {
  project_title: string;
  desc: string;
  git_url: string;
  live_url: string;
  tech_used: string[];
  key_features: string[];
  thumbnail: File | null;
}

export function CreateProjectForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [techInput, setTechInput] = useState("");
  const [featureInput, setFeatureInput] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const form = useForm<ProjectFormData>({
    defaultValues: {
      project_title: "Event Management System",
      desc: "<p>Event Management System is a platform for managing events. It allows users to create, edit, and delete events. It also allows users to view events and register for events.</p><p>This project demonstrates my skills in full-stack web development with a focus on user experience and performance.</p>",
      git_url: "https://github.com/muhammadrafi123/event-management-system",
      live_url: "https://event-management-system.vercel.app",
      tech_used: [
        "React",
        "Next.js",
        "Tailwind CSS",
        "TypeScript",
        "MongoDB",
        "Express",
      ],
      key_features: ["test feature 1", "test feature 2", "test feature 3"],
      thumbnail: null,
    },
  });

  // Watch form values for validation
  const watchedValues = form.watch();

  const addTechnology = () => {
    if (
      techInput.trim() &&
      !form.getValues("tech_used").includes(techInput.trim())
    ) {
      const currentTech = form.getValues("tech_used");
      form.setValue("tech_used", [...currentTech, techInput.trim()]);
      setTechInput("");
    }
  };

  const removeTechnology = (tech: string) => {
    const currentTech = form.getValues("tech_used");
    form.setValue(
      "tech_used",
      currentTech.filter((t) => t !== tech)
    );
  };

  const addFeature = () => {
    if (
      featureInput.trim() &&
      !form.getValues("key_features").includes(featureInput.trim())
    ) {
      const currentFeatures = form.getValues("key_features");
      form.setValue("key_features", [...currentFeatures, featureInput.trim()]);
      setFeatureInput("");
    }
  };

  const removeFeature = (feature: string) => {
    const currentFeatures = form.getValues("key_features");
    form.setValue(
      "key_features",
      currentFeatures.filter((f) => f !== feature)
    );
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      form.setValue("thumbnail", file);
      const reader = new FileReader();
      reader.onload = () => {
        setThumbnailPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 1) remove this line at the top
  // import { createProject } from "@/actions/create";

  const onSubmit = async (data: ProjectFormData) => {
    if (!isAuthenticated || !user) {
      toast.error("You must be logged in to create a project");
      return;
    }

    if (!data.thumbnail) {
      toast.error("Please upload a project thumbnail");
      return;
    }
    if (data.tech_used.length === 0) {
      toast.error("Please add at least one technology");
      return;
    }
    if (data.key_features.length === 0) {
      toast.error("Please add at least one key feature");
      return;
    }

    setIsLoading(true);
    try {
      // 👇 Exactly what your API expects in the "data" field
      const payload = {
        project_title: data.project_title,
        tech_used: data.tech_used, // string[]
        desc: data.desc,
        key_features: data.key_features, // string[]
        git_url: data.git_url,
        live_url: data.live_url,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload)); // <-- single JSON field
      formData.append("thumbnail", data.thumbnail); // <-- file field

      // Submit via server action so cookies (token) are used on the server.
      const result: any = await createProject(formData);
      if (result?.error) {
        throw new Error(result.error);
      }
      toast.success(
        `Project "${
          result?.project_title ?? data.project_title
        }" created successfully! ✅`,
        {
          description: "Your project has been added to your portfolio",
          duration: 5000,
        }
      );
      form.reset();
      setThumbnailPreview(null);
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      toast.error("Project creation failed ❌", {
        description: err?.message || "Unknown error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            Create New Project
          </CardTitle>
          <p className="text-muted-foreground">
            Add a new project to your portfolio
          </p>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Project Title */}
              <FormField
                control={form.control}
                name="project_title"
                rules={{ required: "Project title is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Project Title</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome Project" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Description */}
              <FormField
                control={form.control}
                name="desc"
                rules={{ required: "Description is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <RichTextEditor
                        content={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="git_url"
                  rules={{ required: "GitHub URL is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <Github className="h-4 w-4" />
                        GitHub URL
                      </FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://github.com/username/repo"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="live_url"
                  rules={{ required: "Live URL is required" }}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        Live URL
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="https://myproject.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Technologies Used */}
              <div className="space-y-3">
                <FormLabel>Technologies Used</FormLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a technology (e.g., React, Node.js)"
                    value={techInput}
                    onChange={(e) => setTechInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addTechnology())
                    }
                  />
                  <Button
                    type="button"
                    onClick={addTechnology}
                    variant="outline"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.watch("tech_used").map((tech) => (
                    <Badge
                      key={tech}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {tech}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTechnology(tech)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="space-y-3">
                <FormLabel>Key Features</FormLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a key feature"
                    value={featureInput}
                    onChange={(e) => setFeatureInput(e.target.value)}
                    onKeyPress={(e) =>
                      e.key === "Enter" && (e.preventDefault(), addFeature())
                    }
                  />
                  <Button type="button" onClick={addFeature} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.watch("key_features").map((feature) => (
                    <Badge
                      key={feature}
                      variant="outline"
                      className="flex items-center gap-1"
                    >
                      {feature}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeFeature(feature)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div className="space-y-3">
                <FormLabel>Project Thumbnail</FormLabel>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label htmlFor="thumbnail-upload" className="cursor-pointer">
                    {thumbnailPreview ? (
                      <div className="space-y-2">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="mx-auto max-h-40 rounded-lg"
                        />
                        <p className="text-sm text-muted-foreground">
                          Click to change image
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <Upload className="mx-auto h-12 w-12 text-gray-400" />
                        <p className="text-sm text-muted-foreground">
                          Click to upload thumbnail image
                        </p>
                      </div>
                    )}
                  </label>
                </div>
              </div>

              {/* Preview */}
              {(watchedValues.project_title ||
                watchedValues.tech_used.length > 0 ||
                watchedValues.desc) && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Preview</h3>
                  <Card className="p-4 bg-gray-50">
                    <div className="space-y-3">
                      {watchedValues.project_title && (
                        <h4 className="text-xl font-bold">
                          {watchedValues.project_title}
                        </h4>
                      )}
                      {watchedValues.tech_used.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {watchedValues.tech_used.map((tech) => (
                            <Badge key={tech} variant="secondary">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {watchedValues.desc && (
                        <div className="text-gray-600 text-sm">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: watchedValues.desc,
                            }}
                            className="line-clamp-4"
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              )}

              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Creating Project...
                  </div>
                ) : (
                  "Create Project"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
