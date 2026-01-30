import BlogsTable from "@/components/Tables/BlogsTable";

export default async function BlogsPage() {
  return (
    <div className="min-h-screen p-6 w-full">
      <div className="max-w-6xl mx-auto">
        <BlogsTable />
      </div>
    </div>
  );
}
