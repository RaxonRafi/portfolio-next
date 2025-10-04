"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

/**
 * Server Action to delete a blog post.
 * @param {number} id - The ID of the blog post to delete.
 */
export async function deletePost(id: number) {
  try {
    // 1) Authentication - get token from cookies
    const cookieStore = await cookies();
    const token = cookieStore.get("auth_token")?.value;

    if (!token) {
      return { error: "Not authenticated (auth_token cookie missing)" };
    }

    // 2) Send DELETE request to API
    const apiUrl =
      process.env.NEXT_PUBLIC_BASE_API ||
      "https://muhammadrafi-portfolio-backend.vercel.app/api/v1";

    const res = await fetch(`${apiUrl}/post/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // 3) Handle response
    if (!res.ok) {
      const errorText = await res.text().catch(() => "Unknown error");
      return { error: `Failed to delete post: ${res.status} - ${errorText}` };
    }

    // 4) Revalidate cache
    revalidateTag("POSTS");
    revalidatePath("/dashboard/blogs");
    revalidatePath("/blogs");

    return { success: true, message: "Post deleted successfully" };
  } catch (error: any) {
    console.error("Delete post error:", error);
    return { error: error?.message || "Failed to delete post" };
  }
}
