"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useEffect, useState } from "react";

interface Author {
  id: number;
  name: string;
  email: string;
}

interface BlogPost {
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
  author: Author;
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.slug) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/post/slug/${params.slug}`, // Reverted: Use /post endpoint
          {
            next: { revalidate: 120 }, // ISR - revalidate every 2 minutes
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          if (response.status === 404) {
            notFound();
          }
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        // The blog data might be directly in result or in result.data
        const blogData = result.data || result;

        if (!blogData) {
          notFound();
        }

        setBlog(blogData);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        if ((err as any).message?.includes("404")) {
          notFound();
        }
        setError("Failed to load blog post. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [params.slug]);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  if (loading) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="animate-pulse">
            <div className="h-10 w-32 bg-gray-200 rounded mb-6"></div>
            <div className="space-y-4">
              <div className="h-8 bg-gray-200 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 rounded w-1/2"></div>
              <div className="h-4 bg-gray-200 rounded w-full mt-8"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-4/6"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4 max-w-4xl">
          <Link href="/blogs">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>

          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-red-500 mb-4">
              Error Loading Blog
            </h1>
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  if (!blog) {
    notFound();
  }

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          variants={fadeIn}
        >
          <Link href="/blogs">
            <Button variant="outline" className="mb-6">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blogs
            </Button>
          </Link>

          <div className="text-center mb-8">
            <Badge variant="outline" className="mb-4">
              {blog.tags[0] || "Blog"}
            </Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              {blog.title}
            </h1>
            <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>

            <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-muted-foreground">
              <span>By {blog.author?.name || "Unknown Author"}</span>
              <span>•</span>
              <span>
                {new Date(blog.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {blog.isFeatured && (
                <>
                  <span>•</span>
                  <Badge variant="default">Featured</Badge>
                </>
              )}
            </div>
          </div>

          {blog.thumbnail && (
            <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden mb-8">
              <img
                src={blog.thumbnail}
                alt={`${blog.title} blog post thumbnail`}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none mx-auto bg-muted-foreground p-6 md:p-8 rounded-lg shadow-sm"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
        </motion.div>
      </div>
    </section>
  );
}
