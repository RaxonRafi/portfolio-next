import BlogsTable from "@/components/Tables/BlogsTable";

export default async function BlogsPage() {
  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className="max-w-6xl mx-auto">
        <BlogsTable />
      </div>
    </div>
  );
}
