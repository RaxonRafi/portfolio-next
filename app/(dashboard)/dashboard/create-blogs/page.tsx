// app/(dashboard)/dashboard/create-blog/page.tsx

import { CreateBlogPostForm } from "@/components/forms/CreateBlogForm";
import { getUserSession } from "@/helpers/getUserSession";
import { redirect } from "next/navigation";

export default async function CreateBlogPage() {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className="max-w-6xl mx-auto">
            <CreateBlogPostForm />
      </div>
    </div>
  );
}
