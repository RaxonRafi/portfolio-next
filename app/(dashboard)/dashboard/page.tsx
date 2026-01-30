import { getUserSession } from "@/helpers/getUserSession";
import { redirect } from "next/navigation";

export default async function DashboardHome() {
  const session = await getUserSession();

  if (!session) {
    redirect("/login");
  }

  const quote = "The secret of getting ahead is getting started. – Mark Twain";

  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-6 w-full">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-4xl font-bold text-white mb-4">
          Welcome, {session.user.name}!
        </h1>
        <div className="neo-card p-6 mb-6">
          <div className="space-y-2">
            <p className="text-lg text-white/80">
              <span className="font-semibold text-white">Email:</span> {session.user.email}
            </p>
            <p className="text-lg text-white/80">
              <span className="font-semibold text-white">Role:</span>
              <span
                className={`ml-2 px-2 py-1 rounded-full text-sm ${
                  session.user.role === "ADMIN"
                    ? "bg-[rgba(138,43,226,0.3)] text-[#b24bff] border border-[rgba(138,43,226,0.4)]"
                    : "bg-[rgba(51,61,71,0.6)] text-white/90 border border-[rgba(138,43,226,0.2)]"
                }`}
              >
                {session.user.role}
              </span>
            </p>
            <p className="text-lg text-white/80">
              <span className="font-semibold text-white">User ID:</span> {session.user.id}
            </p>
          </div>
        </div>
        <p className="text-lg text-white/60 italic">{quote}</p>
      </div>
    </div>
  );
}
