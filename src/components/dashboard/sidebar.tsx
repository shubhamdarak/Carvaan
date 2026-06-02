"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard, Users, Building2, Briefcase, Megaphone, CreditCard,
  BarChart2, Settings, Search, Star, MessageSquare, FileText,
  CheckSquare, Globe, UserCircle, TrendingUp, BookOpen, Bell,
  ChevronLeft, LogOut, type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { clearDemoRole, getDemoRole } from "@/lib/auth";
import type { UserRole } from "@/types";

interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string | number;
}

const adminNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/admin", icon: LayoutDashboard },
  { label: "Users", href: "/dashboard/admin/users", icon: Users },
  { label: "Agencies", href: "/dashboard/admin/agencies", icon: Briefcase },
  { label: "Brands", href: "/dashboard/admin/brands", icon: Building2 },
  { label: "Creators", href: "/dashboard/admin/creators", icon: UserCircle },
  { label: "Campaigns", href: "/dashboard/admin/campaigns", icon: Megaphone },
  { label: "Payments", href: "/dashboard/admin/payments", icon: CreditCard },
  { label: "Reports", href: "/dashboard/admin/reports", icon: BarChart2 },
  { label: "Platform Settings", href: "/dashboard/admin/settings", icon: Settings },
];

const agencyNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/agency", icon: LayoutDashboard },
  { label: "Clients", href: "/dashboard/agency/clients", icon: Building2 },
  { label: "Campaigns", href: "/dashboard/agency/campaigns", icon: Megaphone },
  { label: "Creator Discovery", href: "/dashboard/agency/discovery", icon: Search },
  { label: "Shortlists", href: "/dashboard/agency/shortlists", icon: Star },
  { label: "Outreach Pipeline", href: "/dashboard/agency/outreach", icon: MessageSquare },
  { label: "Content Approval", href: "/dashboard/agency/content", icon: CheckSquare },
  { label: "Brief Generator", href: "/dashboard/agency/briefs", icon: FileText },
  { label: "Analytics", href: "/dashboard/agency/analytics", icon: TrendingUp },
  { label: "Reports", href: "/dashboard/agency/reports", icon: BarChart2 },
  { label: "Payments", href: "/dashboard/agency/payments", icon: CreditCard },
  { label: "Team", href: "/dashboard/agency/team", icon: Users },
  { label: "Settings", href: "/dashboard/agency/settings", icon: Settings },
];

const brandNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/brand", icon: LayoutDashboard },
  { label: "Campaigns", href: "/dashboard/brand/campaigns", icon: Megaphone },
  { label: "Creator Shortlist", href: "/dashboard/brand/shortlist", icon: Star },
  { label: "Content Approval", href: "/dashboard/brand/content", icon: CheckSquare },
  { label: "Analytics", href: "/dashboard/brand/analytics", icon: TrendingUp },
  { label: "Reports", href: "/dashboard/brand/reports", icon: BarChart2 },
  { label: "Billing", href: "/dashboard/brand/billing", icon: CreditCard },
  { label: "Settings", href: "/dashboard/brand/settings", icon: Settings },
];

const creatorNav: NavItem[] = [
  { label: "Overview", href: "/dashboard/creator", icon: LayoutDashboard },
  { label: "My Profile", href: "/dashboard/creator/profile", icon: UserCircle },
  { label: "Opportunities", href: "/dashboard/creator/opportunities", icon: Globe },
  { label: "Active Campaigns", href: "/dashboard/creator/campaigns", icon: Megaphone },
  { label: "Content Submissions", href: "/dashboard/creator/submissions", icon: CheckSquare },
  { label: "Performance", href: "/dashboard/creator/performance", icon: BarChart2 },
  { label: "Payments", href: "/dashboard/creator/payments", icon: CreditCard },
  { label: "Settings", href: "/dashboard/creator/settings", icon: Settings },
];

const navByRole: Record<UserRole, NavItem[]> = {
  admin: adminNav,
  agency: agencyNav,
  brand: brandNav,
  creator: creatorNav,
};

const roleLabels: Record<UserRole, { label: string; org: string }> = {
  admin: { label: "Super Admin", org: "Carvaan Platform" },
  agency: { label: "Agency Account", org: "Maqsad Creative" },
  brand: { label: "Brand Account", org: "Gleam Skincare" },
  creator: { label: "Creator Account", org: "Layla Al Mansouri" },
};

interface SidebarProps {
  role: UserRole;
  onClose?: () => void;
}

export function Sidebar({ role, onClose }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const nav = navByRole[role];
  const roleInfo = roleLabels[role];

  const logout = () => {
    clearDemoRole();
    router.push("/login");
  };

  return (
    <div className="flex flex-col h-full bg-white border-r border-slate-200">
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-5 border-b border-slate-100 flex-shrink-0">
        <Link href="/" className="flex items-center">
          <span className="text-[#0f1e38] font-bold text-base tracking-tight">Carvaan</span>
        </Link>
        {onClose && (
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-500 lg:hidden">
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Role badge */}
      <div className="px-4 py-3 border-b border-slate-100 flex-shrink-0">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center">
            <span className="text-teal-700 font-semibold text-xs">{roleInfo.org[0]}</span>
          </div>
          <div className="min-w-0">
            <p className="text-xs font-semibold text-slate-800 truncate">{roleInfo.org}</p>
            <p className="text-xs text-slate-500 truncate">{roleInfo.label}</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-3 px-2">
        <div className="space-y-0.5">
          {nav.map((item) => {
            const isActive = pathname === item.href || (item.href !== `/dashboard/${role}` && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150",
                  isActive
                    ? "bg-[#0f1e38] text-white font-medium"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                )}
              >
                <item.icon className={cn("w-4 h-4 flex-shrink-0", isActive ? "text-white" : "text-slate-400")} />
                <span className="truncate">{item.label}</span>
                {item.badge && (
                  <span className="ml-auto bg-teal-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom */}
      <div className="flex-shrink-0 p-3 border-t border-slate-100 space-y-1">
        <Link href="/login" onClick={logout} className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-all w-full">
          <LogOut className="w-4 h-4 text-slate-400" />
          <span>Sign out</span>
        </Link>
      </div>
    </div>
  );
}
