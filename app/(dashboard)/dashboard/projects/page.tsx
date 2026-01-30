import ProjectsTable from "@/components/Tables/ProjectsTable";

export default async function CreateProjectPage() {


  return (
    <div className="min-h-screen p-6 w-full">
      <div className="max-w-6xl mx-auto">
        <ProjectsTable/>
      </div>
    </div>
  );
}
