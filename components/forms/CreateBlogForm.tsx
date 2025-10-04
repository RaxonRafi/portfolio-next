// components/forms/CreateBlogForm.tsx
"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createBlog } from "@/actions/create";
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
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Plus, Upload, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { RichTextEditor } from "@/components/RichTextEditor";

interface BlogFormData {
  title: string;
  content: string;
  isFeatured: boolean;
  tags: string[];
  thumbnail: File | null;
}

export function CreateBlogPostForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [isLoading, setIsLoading] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();

  const form = useForm<BlogFormData>({
    defaultValues: {
      title: "How I built my Event Management System",
      content:
        "<p>This is a quick walkthrough of the architecture, trade-offs, and deployment notes…</p>",
      isFeatured: false,
      tags: ["nextjs", "react", "typescript"],
      thumbnail: null,
    },
  });

  const watchedValues = form.watch();

  const addTag = () => {
    const val = tagInput.trim();
    if (val && !form.getValues("tags").includes(val)) {
      const current = form.getValues("tags");
      form.setValue("tags", [...current, val]);
      setTagInput("");
    }
  };

  const removeTag = (t: string) => {
    const current = form.getValues("tags");
    form.setValue(
      "tags",
      current.filter((x) => x !== t)
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

  const onSubmit = async (data: BlogFormData) => {
    if (!isAuthenticated || !user) {
      toast.error("You must be logged in to create a blog post");
      return;
    }
    if (!data.title.trim()) {
      toast.error("Title is required");
      return;
    }
    if (!data.content || !data.content.trim()) {
      toast.error("Content is required");
      return;
    }
    if (data.tags.length === 0) {
      toast.error("Please add at least one tag");
      return;
    }

    setIsLoading(true);
    try {
      const payload = {
        title: data.title,
        content: data.content,
        isFeatured: data.isFeatured,
        tags: data.tags,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      if (data.thumbnail) formData.append("thumbnail", data.thumbnail);

      const result: any = await createBlog(formData);
      if (result?.error) throw new Error(result.error);

      toast.success(
        `Blog "${result?.data?.title ?? data.title}" created successfully! ✅`,
        { description: "Your post is now live (or pending review)" }
      );

      form.reset({
        title: "",
        content: "",
        isFeatured: false,
        tags: [],
        thumbnail: null,
      });
      setThumbnailPreview(null);
      router.push("/dashboard");
      router.refresh();
    } catch (err: any) {
      toast.error("Blog creation failed ❌", {
        description: err?.message || "Unknown error",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Create New Blog</CardTitle>
          <p className="text-muted-foreground">
            Write a new post for your blog
          </p>
        </CardHeader>

        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Title */}
              <FormField
                control={form.control}
                name="title"
                rules={{ required: "Title is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="My awesome blog post" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Featured Toggle */}
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel>Feature this post</FormLabel>
                      <p className="text-sm text-muted-foreground">
                        Mark as featured to highlight on your homepage.
                      </p>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              {/* Content */}
              <FormField
                control={form.control}
                name="content"
                rules={{ required: "Content is required" }}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
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

              {/* Tags */}
              <div className="space-y-3">
                <FormLabel>Tags</FormLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder="Add a tag (e.g., nextjs)"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={addTag} variant="outline">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {form.watch("tags").map((t) => (
                    <Badge
                      key={t}
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      {t}
                      <X
                        className="h-3 w-3 cursor-pointer"
                        onClick={() => removeTag(t)}
                      />
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Thumbnail Upload */}
              <div className="space-y-3">
                <FormLabel>Thumbnail (optional)</FormLabel>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                    id="post-thumbnail-upload"
                  />
                  <label
                    htmlFor="post-thumbnail-upload"
                    className="cursor-pointer"
                  >
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
              {(watchedValues.title ||
                watchedValues.tags.length > 0 ||
                watchedValues.content) && (
                <div className="border-t pt-6">
                  <h3 className="text-lg font-semibold mb-4">Preview</h3>
                  <Card className="p-4 bg-gray-50">
                    <div className="space-y-3">
                      {watchedValues.title && (
                        <h4 className="text-xl font-bold">
                          {watchedValues.title}
                        </h4>
                      )}
                      {watchedValues.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {watchedValues.tags.map((t) => (
                            <Badge key={t} variant="secondary">
                              {t}
                            </Badge>
                          ))}
                        </div>
                      )}
                      {watchedValues.content && (
                        <div className="text-gray-600 text-sm">
                          <div
                            dangerouslySetInnerHTML={{
                              __html: watchedValues.content,
                            }}
                            className="line-clamp-4"
                          />
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              )}

              {/* Submit */}
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Publishing…
                  </div>
                ) : (
                  "Publish Post"
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
