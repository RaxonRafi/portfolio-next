"use client";

import DeleteBlogModal from "@/components/Modals/DeleteBlogModal";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight, Eye, Trash2, User } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Author {
  id: number;
  name: string;
  email: string;
}

interface Blog {
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

const API_URL = `${process.env.NEXT_PUBLIC_BASE_API}/post`; 
const ITEMS_PER_PAGE = 5;

const BlogsTable = ({ className, ...props }: React.ComponentProps<"div">) => {
  const [allBlogs, setAllBlogs] = useState<Blog[]>([]); // Stores all fetched blogs
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const result = await response.json();
      // The actual data is in the 'data' property of the response
      const blogsData = Array.isArray(result) ? result : result.data || [];
      setAllBlogs(blogsData);
    } catch (e: any) {
      console.error("Fetching blogs failed:", e);
      setError("Failed to load blogs. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const totalPages = Math.ceil(allBlogs.length / ITEMS_PER_PAGE);

  const blogsOnCurrentPage = useMemo(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    return allBlogs.slice(startIndex, endIndex);
  }, [allBlogs, currentPage]);

  const goToNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const goToPrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const formatTags = (tagsArray: string[]) => {
    return tagsArray.join(", ");
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  const handleDeleteClick = (blog: Blog) => {
    setSelectedBlog(blog);
    setDeleteModalOpen(true);
  };

  const handleBlogDeleted = () => {
    // Refetch blogs after deletion
    fetchBlogs();
  };

  if (loading) {
    return (
      <div
        className={cn("w-full max-w-4xl mx-auto text-center py-10 text-white/80", className)}
      >
        <p>Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className={cn(
          "w-full max-w-4xl mx-auto text-center py-10 text-red-400",
          className
        )}
      >
        <p>{error}</p>
      </div>
    );
  }

  // --- Component Render ---
  return (
    <div className={cn("w-full max-w-4xl mx-auto", className)} {...props}>
      <Card className="neo-card border-[rgba(138,43,226,0.2)]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white">Blogs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>
              A list of your blogs. Showing {blogsOnCurrentPage.length} of{" "}
              {allBlogs.length} blogs.
            </TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Featured</TableHead>
                <TableHead>Views</TableHead>
                <TableHead>Author</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Options</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {blogsOnCurrentPage.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="h-24 text-center text-white/60">
                    No blogs found.
                  </TableCell>
                </TableRow>
              ) : (
                blogsOnCurrentPage.map((blog) => (
                  <TableRow key={blog.id}>
                    <TableCell className="font-medium max-w-xs truncate text-white/90">
                      {blog.title}
                    </TableCell>
                    <TableCell className="max-w-xs truncate text-white/80">
                      {formatTags(blog.tags)}
                    </TableCell>
                    <TableCell>
                      {blog.isFeatured ? (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[rgba(34,197,94,0.2)] text-emerald-400 border border-emerald-500/30">
                          Yes
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/10 text-white/70 border border-white/20">
                          No
                        </span>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-white/80">
                        <Eye className="mr-1 h-4 w-4 text-white/50" />
                        {blog.views}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center text-white/80">
                        <User className="mr-1 h-4 w-4 text-white/50" />
                        {blog.author?.name || "Unknown"}
                      </div>
                    </TableCell>
                    <TableCell className="text-white/80">{formatDate(blog.createdAt)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-[rgba(138,43,226,0.3)] text-white/90 hover:bg-[rgba(138,43,226,0.15)]"
                        onClick={() => handleDeleteClick(blog)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell className="text-right">
                      <Link href={`/blogs/${blog.slug}`}>
                        <Button variant="outline" size="sm" className="border-[rgba(138,43,226,0.3)] text-white/90 hover:bg-[rgba(138,43,226,0.15)]">
                          View
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Delete Blog Modal */}
      <DeleteBlogModal
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        blog={selectedBlog}
        onDeleted={handleBlogDeleted}
      />

      {/* --- Pagination Controls --- */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between space-x-2 py-4 px-2">
          <Button
            variant="outline"
            size="sm"
            className="border-[rgba(138,43,226,0.3)] text-white/90 hover:bg-[rgba(138,43,226,0.15)]"
            onClick={goToPrevPage}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
          </Button>
          <div className="flex-1 text-sm text-white/60 text-center">
            Page {currentPage} of {totalPages}
          </div>
          <Button
            variant="outline"
            size="sm"
            className="border-[rgba(138,43,226,0.3)] text-white/90 hover:bg-[rgba(138,43,226,0.15)]"
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
          >
            Next <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};

export default BlogsTable;
