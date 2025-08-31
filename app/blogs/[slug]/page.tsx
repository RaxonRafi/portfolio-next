import { blogs } from "@/data/blogs";
import Image from "next/image";
import Link from "next/link";

interface Props {
  params: { slug: string };
}

export default function BlogDetails({ params }: Props) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) return <p className="text-center py-20">Blog not found</p>;

  return (
    <section className="py-20 container mx-auto px-4">
      <Link href="/blog" className="text-primary font-semibold mb-4 inline-block">
        ← Back to Blog
      </Link>
      <h1 className="text-3xl font-bold mb-4">{blog.title}</h1>
      {typeof blog.image === "string" ? (
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full rounded-md object-cover aspect-video mb-6"
        />
      ) : (
        <Image
          src={blog.image}
          alt={blog.title}
          width={1200}
          height={800}
          className="w-full rounded-md object-cover mb-6"
        />
      )}
      <p className="text-muted-foreground">{blog.content}</p>
    </section>
  );
}
