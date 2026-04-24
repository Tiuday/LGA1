"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LayoutDashboard, Users, Settings, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/prospects", label: "Prospects", icon: Users },
  { href: "/settings", label: "Settings", icon: Settings },
];

interface SidebarProps {
  userEmail: string;
}

export function Sidebar({ userEmail }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/login");
  }

  return (
    <aside className="fixed left-0 top-0 h-full w-60 bg-surface-2 border-r border-surface-border flex flex-col z-40">
      <div className="px-6 py-5 border-b border-surface-border">
        <span className="font-display font-bold text-lg text-white tracking-tight">
          Sales<span className="text-brand">.</span>Agent
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 flex flex-col gap-0.5">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2 text-sm font-mono transition-all duration-150",
                active
                  ? "text-white border-l-2 border-brand bg-brand/10 pl-[10px]"
                  : "text-white/50 border-l-2 border-transparent hover:text-white hover:bg-white/5"
              )}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="px-4 py-4 border-t border-surface-border">
        <p className="text-xs font-mono text-white/30 truncate mb-3">
          {userEmail}
        </p>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-mono text-white/40 hover:text-red-400 transition-colors duration-150"
        >
          <LogOut size={13} />
          Logout
        </button>
      </div>
    </aside>
  );
}
