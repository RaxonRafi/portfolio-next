import Sidebar from "@/components/shared/Sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="min-h-dvh flex" style={{ backgroundColor: '#121212' }}>
      <Sidebar />
      <div className="flex-1 overflow-auto">
        {children}
      </div>
    </main>
  );
}