import { getUserSession } from "@/helpers/getUserSession";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

  const quote = "The secret of getting ahead is getting started. – Mark Twain";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50 p-6 w-full">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome, {session.user.name}!
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="space-y-2">
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Email:</span> {session.user.email}
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">Role:</span>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-sm ${
                  session.user.role === "ADMIN"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {session.user.role}
              </span>
            </p>
            <p className="text-lg text-gray-600">
              <span className="font-semibold">User ID:</span> {session.user.id}
            </p>
          </div>
        </div>
        <p className="text-lg text-gray-600 italic">{quote}</p>
      </div>
    </div>
  );
}
