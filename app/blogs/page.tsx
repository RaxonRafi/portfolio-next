"use client";
import { motion } from "framer-motion"
import { Blog7 } from "@/components/Blog";
import { blogs } from "@/data/blogs";
import { Badge } from "@/components/ui/badge";

export default function BlogPage() {
    const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
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
        posts={blogs.map((blog) => ({
          id: blog.id.toString(),
          title: blog.title,
          summary: blog.shortDescription,
          label: blog.tags[0] || "General",
          author: "Admin",
          published: "1 Aug 2025",
          url: `/blogs/${blog.slug}`,
          image:
            typeof blog.image === "string"
              ? blog.image
              : blog.image.src, 
        }))}
      />
      </div>
    </section>
  );
}
