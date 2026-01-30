"use client";

import { BookOpen, Folder, FolderPlus, Home, LayoutDashboard, LogOut, PlusCircle } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      if (response.ok) {
        toast.success("Logged out successfully");
        router.push("/");
        router.refresh();
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("An error occurred during logout");
    }
  };

  const navItems = [
    { href: "/", icon: Home, label: "Home" },
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/dashboard/projects", icon: Folder, label: "Projects" },
    { href: "/dashboard/create-project", icon: FolderPlus, label: "Create Project" },
    { href: "/dashboard/blogs", icon: BookOpen, label: "Blogs" },
    { href: "/dashboard/create-blogs", icon: PlusCircle, label: "Create Blog" },
  ];

  return (
    <aside 
      className="flex h-screen w-64 flex-col border-r sticky top-0"
      style={{ 
        backgroundColor: '#0a0a0a',
        borderColor: 'rgba(138, 43, 226, 0.2)'
      }}
    >
      {/* Logo */}
      <div 
        className="p-6 border-b"
        style={{ borderColor: 'rgba(138, 43, 226, 0.2)' }}
      >
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-mono">
            <span className="text-white/90">M</span>
            <span 
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: 'linear-gradient(135deg, #8A2BE2 0%, #b24bff 100%)',
              }}
            >
              .Rafi
            </span>
          </span>
        </Link>
        <p className="text-white/40 text-xs font-mono mt-1">Admin Dashboard</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== "/" && item.href !== "/dashboard" && pathname.startsWith(item.href));
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-mono transition-all duration-200 ${
                isActive 
                  ? 'text-white' 
                  : 'text-white/50 hover:text-white/80'
              }`}
              style={{
                backgroundColor: isActive ? 'rgba(138, 43, 226, 0.15)' : 'transparent',
                borderLeft: isActive ? '2px solid #8A2BE2' : '2px solid transparent',
              }}
            >
              <Icon 
                className="h-4 w-4" 
                style={{ color: isActive ? '#8A2BE2' : undefined }}
              />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div 
        className="p-4 border-t space-y-3"
        style={{ borderColor: 'rgba(138, 43, 226, 0.2)' }}
      >
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-mono w-full text-white/50 hover:text-white hover:bg-[rgba(138,43,226,0.1)] transition-all duration-200"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
        <p className="text-white/30 text-xs font-mono text-center">
          © 2026 Muhammad Rafi
        </p>
      </div>
    </aside>
  );
}
