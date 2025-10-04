"use client";

import { Blog7 } from "@/components/Blog";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
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

interface TransformedBlogPost {
  id: string;
  title: string;
  summary: string;
  label: string;
  author: string;
  published: string;
  url: string;
  image: string;
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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_API}/post`,
          {
            next: { revalidate: 60 }, // ISR - revalidate every 60 seconds
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
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
          author: blog.author?.name || "Admin",
          published: new Date(blog.createdAt).toLocaleDateString(),
          url: `/blogs/${blog.slug}`,
          image: blog.thumbnail || "/placeholder-image.jpg",
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

  if (loading) {
    return (
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Blogs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Blogs</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
            <p className="mt-8 text-muted-foreground">Loading blogs...</p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              Blogs
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Blogs</h2>
            <div className="w-20 h-1 bg-primary mx-auto"></div>
            <p className="mt-8 text-red-500">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-muted/30">
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
            Blogs
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Blogs</h2>
          <div className="w-20 h-1 bg-primary mx-auto"></div>
        </motion.div>
        <Blog7
          tagline="Latest Articles"
          heading="Our Blog"
          description="Discover the latest insights, tips, and tutorials in web development. Stay updated with our expert posts and guides."
          buttonText="View all articles"
          buttonUrl="/blog"
          posts={posts}
        />
      </div>
    </section>
  );
}
