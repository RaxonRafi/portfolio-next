"use client";

import { Blog } from "@/components/Blog";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// ═══════════════════════════════════════════════════════════════════════════
// 📝 BLOG PAGE - NEO-TERMINAL STYLE
// ═══════════════════════════════════════════════════════════════════════════

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

interface TransformedBlogPost {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
  readTime?: string;
}

export default function BlogPage() {
  const [posts, setPosts] = useState<TransformedBlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const baseUrl =
          process.env.NEXT_PUBLIC_BASE_API ||
          "https://muhammadrafi-portfolio-backend.vercel.app/api/v1";
        const response = await fetch(`${baseUrl}/post`, {
          next: { revalidate: 60 },
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        const blogsData = Array.isArray(result) ? result : result.data || [];
        const transformedPosts = blogsData.map((blog: BlogPost) => ({
          id: blog.id.toString(),
          title: blog.title,
          summary:
            blog.content.replace(/<[^>]*>/g, "").substring(0, 150) + "...",
          label: blog.tags[0] || "General",
          author: blog.author?.name || "Muhammad Rafi",
          published: new Date(blog.createdAt).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric"
          }),
          url: `/blogs/${blog.slug}`,
          image: blog.thumbnail || "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
          readTime: `${Math.ceil(blog.content.replace(/<[^>]*>/g, "").split(" ").length / 200)} min read`,
        }));

        setPosts(transformedPosts);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blogs:", err);
        setError("Failed to load blogs. Please try again later.");
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Loading state
  if (loading) {
    return (
      <section 
        className="min-h-screen py-32 relative"
        style={{ backgroundColor: '#121212' }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mb-16"
          >
            <span 
              className="font-mono text-[0.65rem] uppercase tracking-[0.15em] mb-4 block"
              style={{ color: '#8A2BE2' }}
            >
              07 — Blog
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 font-mono text-white">
              Latest{' '}
              <span 
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #8A2BE2 0%, #b24bff 100%)',
                }}
              >
                Articles
              </span>
            </h2>
          </motion.div>

          <div className="flex justify-center items-center py-20">
            <div 
              className="w-10 h-10 border-2 border-t-transparent rounded-full animate-spin"
              style={{ borderColor: '#8A2BE2', borderTopColor: 'transparent' }}
            />
            <span className="ml-4 text-white/50 font-mono">Loading blogs...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section 
        className="min-h-screen py-32 relative"
        style={{ backgroundColor: '#121212' }}
      >
        <div className="container mx-auto px-6">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl mb-16"
          >
            <span 
              className="font-mono text-[0.65rem] uppercase tracking-[0.15em] mb-4 block"
              style={{ color: '#8A2BE2' }}
            >
              07 — Blog
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-normal mb-6 font-mono text-white">
              Latest{' '}
              <span 
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: 'linear-gradient(135deg, #8A2BE2 0%, #b24bff 100%)',
                }}
              >
                Articles
              </span>
            </h2>
          </motion.div>

          <div className="neo-card p-8 text-center max-w-xl mx-auto">
            <p className="text-red-400 font-mono">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  // Success state - use Blog component
  return <Blog posts={posts} />;
}
