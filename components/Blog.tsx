"use client";

import { motion } from "framer-motion";
import { ArrowRight, Calendar, Clock } from "lucide-react";

// ═══════════════════════════════════════════════════════════════════════════
// 📝 BLOG SECTION - NEO-TERMINAL STYLE
// Consistent design with About section
// ═══════════════════════════════════════════════════════════════════════════

interface Post {
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

interface BlogProps {
  posts?: Post[];
}

const defaultPosts: Post[] = [
  {
    id: "post-1",
    title: "Getting Started with Next.js 15",
    summary:
      "Learn how to quickly set up and build modern web applications with Next.js 15. Covering App Router, Server Components, and best practices.",
    label: "Tutorial",
    author: "Muhammad Rafi",
    published: "15 Jan 2026",
    url: "#",
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=600&h=400&fit=crop",
    readTime: "5 min read",
  },
  {
    id: "post-2",
    title: "Building Scalable APIs with Node.js",
    summary:
      "Explore best practices for creating robust and scalable REST APIs using Node.js, Express, and modern architectural patterns.",
    label: "Backend",
    author: "Muhammad Rafi",
    published: "10 Jan 2026",
    url: "#",
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
    readTime: "7 min read",
  },
  {
    id: "post-3",
    title: "AI Integration in Modern Web Apps",
    summary:
      "Discover how to integrate AI capabilities into your web applications using OpenAI API, LangChain, and modern AI tooling.",
    label: "AI",
    author: "Muhammad Rafi",
    published: "5 Jan 2026",
    url: "#",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    readTime: "8 min read",
  },
];

const Blog = ({ posts = defaultPosts }: BlogProps) => {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section 
      id="blogs" 
      className="py-32 relative overflow-hidden"
      style={{ backgroundColor: '#121212' }}
    >
      {/* Top border */}
      <div 
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(138, 43, 226, 0.2), transparent)'
        }}
      />

      {/* Background glow */}
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(138, 43, 226, 0.03), transparent 70%)'
        }}
      />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header - Consistent with About */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
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
          <p className="text-lg text-white/50 leading-relaxed">
            Thoughts, tutorials, and insights on software development, AI, and modern web technologies.
          </p>
        </motion.div>

        {/* Blog Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="neo-card overflow-hidden group"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, #121212 0%, transparent 100%)'
                  }}
                />
                
                {/* Label badge */}
                <div className="absolute top-4 left-4">
                  <span 
                    className="px-3 py-1 text-[0.65rem] font-mono uppercase tracking-wider rounded-full"
                    style={{
                      backgroundColor: 'rgba(138, 43, 226, 0.2)',
                      border: '1px solid rgba(138, 43, 226, 0.4)',
                      color: '#8A2BE2'
                    }}
                  >
                    {post.label}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta info */}
                <div className="flex items-center gap-4 mb-4 text-white/40 text-xs font-mono">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5" />
                    {post.published}
                  </span>
                  {post.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {post.readTime}
                    </span>
                  )}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-white mb-3 font-mono leading-tight group-hover:text-[#8A2BE2] transition-colors duration-300">
                  <a href={post.url} target="_blank" rel="noopener noreferrer">
                    {post.title}
                  </a>
                </h3>

                {/* Summary */}
                <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-3">
                  {post.summary}
                </p>

                {/* Read more */}
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-mono transition-colors duration-300"
                  style={{ color: '#8A2BE2' }}
                >
                  Read more
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View all button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        >
          <a 
            href="/blogs"
            className="neo-button px-8 py-4 font-mono text-lg inline-flex items-center gap-2"
            style={{ color: '#8A2BE2' }}
          >
            View All Articles
            <ArrowRight className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export { Blog, Blog as Blog7 };
export default Blog;
