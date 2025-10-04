import { CreateProjectForm } from "@/components/forms/CreateProjectForm";

export default async function CreateProjectPage() {


  return (
    <div className="min-h-screen bg-gray-50 p-6 w-full">
      <div className="max-w-6xl mx-auto">
        <CreateProjectForm />
      </div>
    </div>
  );
}
