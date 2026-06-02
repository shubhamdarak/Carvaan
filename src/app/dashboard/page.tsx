"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getDemoRole } from "@/lib/auth";

export default function DashboardRoot() {
  const router = useRouter();

  useEffect(() => {
    const role = getDemoRole();
    router.replace(`/dashboard/${role || "agency"}`);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full py-24">
      <div className="text-center">
        <div className="w-8 h-8 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
        <p className="text-sm text-slate-500">Loading dashboard...</p>
      </div>
    </div>
  );
}
