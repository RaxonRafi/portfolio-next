// actions/create.ts
"use server";

import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export const createProject = async (data: FormData) => {
  // 1) Auth from cookie (exact cookie name from your screenshot)
  const cookieStore =await cookies();
  const token =
    cookieStore.get("auth_token")?.value ||
    cookieStore.get("token")?.value ||
    cookieStore.get("access_token")?.value;

  if (!token) return { error: "Not authenticated (auth_token cookie missing)" };

  // 2) Validate incoming FormData basics
  const jsonField = data.get("data");
  const thumbnailFile = data.get("thumbnail") as File | null;
  if (typeof jsonField !== "string") return { error: "Invalid request: missing data field." };
  if (!thumbnailFile) return { error: "Project thumbnail is required." };

  try {
    const parsed = JSON.parse(jsonField);
    if (!parsed?.project_title || !parsed?.desc) {
      return { error: "project_title and desc are required." };
    }
    if (!Array.isArray(parsed.tech_used) || !Array.isArray(parsed.key_features)) {
      return { error: "tech_used and key_features must be arrays." };
    }
  } catch {
    return { error: "Invalid JSON in data field." };
  }

  // 3) Call your API with the cookie token as Bearer
  const apiUrl =
    process.env.NEXT_PUBLIC_BASE_API ||
    "https://muhammadrafi-portfolio-backend.vercel.app/api/v1";

  try {
    const res = await fetch(`${apiUrl}/project`, {
      method: "POST",
      body: data,   
      headers: { Authorization: `Bearer ${token}` },
      cache: "no-store",
    });

    // Parse response robustly
    let result: any = null;
    const clone = res.clone();
    try {
      result = await res.json();
    } catch {
      const text = await clone.text();
      console.error("createProject non-JSON:", res.status, text);
      return { error: `Project creation failed (${res.status})` };
    }

    // Your API often returns { data: created }
    const created = result?.data ?? result;

    if (res.status !== 201 || !created?.id) {
      console.error("createProject API error:", res.status, result);
      return { error: result?.message || "Project creation failed" };
    }

    revalidateTag("PROJECTS");
    revalidatePath("/dashboard");
    return result; 
  } catch (e) {
    console.error("Project creation error:", e);
    return { error: "Failed to create project" };
  }
};

export async function createBlog(formData: FormData) {
  const jar =await cookies();
  const auth = jar.get("auth_token")?.value;
  if (!auth) return { error: "Not authenticated (auth_token cookie missing)" };

  const dataField = formData.get("data");
  if (typeof dataField !== "string") return { error: "Invalid request: missing data field." };
  try {
    const parsed = JSON.parse(dataField);
    if (!parsed?.title || !parsed?.content) return { error: "title and content are required." };
    if (!Array.isArray(parsed.tags)) return { error: "tags must be an array." };
  } catch {
    return { error: "Invalid JSON in data field." };
  }

  const apiUrl =
    process.env.NEXT_PUBLIC_BASE_API ||
    "https://muhammadrafi-portfolio-backend.vercel.app/api/v1";

  const res = await fetch(`${apiUrl}/post`, {
    method: "POST",
    body: formData,
    headers: { Authorization: `Bearer ${auth}` },
      cache: "no-store",
  });

  let result: any = {};
  try { result = await res.json(); } catch {}
  const created = result?.data ?? result;

  if (res.status !== 201 || !created?.id) {
    return { error: result?.message || `Blog creation failed (${res.status})` };
  }

  revalidateTag("POSTS");
  revalidatePath("/dashboard");
  return result;
}
