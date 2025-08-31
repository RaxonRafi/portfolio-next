import { StaticImageData } from "next/image";
import blogImg1 from "@/public/blogs/blog1.jpg";
import blogImg2 from "@/public/blogs/blog2.jpg";
import blogImg3 from "@/public/blogs/blog3.jpg";

export interface BlogPost {
  id: number;
  title: string;
  shortDescription: string;
  image: string | StaticImageData;
  tags: string[];
  content: string;
  slug: string;
}

export const blogs: BlogPost[] = [
  {
    id: 1,
    title: "How to Build a High-Performance Website",
    shortDescription: "Tips and techniques to optimize website speed and performance.",
    image: blogImg1,
    tags: ["Web Development", "Performance"],
    content: "Full blog content here...",
    slug: "high-performance-website",
  },
  {
    id: 2,
    title: "Understanding Next.js page Router",
    shortDescription: "A guide to Next.js page Router and layouts.",
    image: blogImg2,
    tags: ["Next.js", "React"],
    content: "Full blog content here...",
    slug: "nextjs-app-router",
  },
  {
    id: 3,
    title: "Understanding Next.js App Router",
    shortDescription: "A guide to Next.js App Router and layouts.",
    image: blogImg3,
    tags: ["Next.js", "React"],
    content: "Full blog content here...",
    slug: "nextjs-page-router",
  },

];
