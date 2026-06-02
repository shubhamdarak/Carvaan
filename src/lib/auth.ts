"use client";

import type { UserRole } from "@/types";

const ROLE_KEY = "carvaan_demo_role";

export function setDemoRole(role: UserRole) {
  if (typeof window !== "undefined") {
    localStorage.setItem(ROLE_KEY, role);
  }
}

export function getDemoRole(): UserRole | null {
  if (typeof window === "undefined") return null;
  return (localStorage.getItem(ROLE_KEY) as UserRole) || null;
}

export function clearDemoRole() {
  if (typeof window !== "undefined") {
    localStorage.removeItem(ROLE_KEY);
  }
}

export const demoCredentials: Record<UserRole, { email: string; password: string; name: string; organization: string }> = {
  admin: { email: "admin@carvaan.io", password: "admin2025", name: "System Admin", organization: "Carvaan Platform" },
  agency: { email: "agency@maqsaddemo.ae", password: "agency2025", name: "Amira Al Qassimi", organization: "Maqsad Creative" },
  brand: { email: "brand@gleamdemo.com", password: "brand2025", name: "Layla Al Hamdan", organization: "Gleam Skincare" },
  creator: { email: "creator@carvaan.io", password: "creator2025", name: "Layla Al Mansouri", organization: "Creator" },
};
