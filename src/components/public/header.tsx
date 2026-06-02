"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const navLinks = [
  {
    label: "Platform",
    href: "#",
    children: [
      { label: "For Brands", href: "/brands" },
      { label: "For Agencies", href: "/agencies" },
      { label: "For Creators", href: "/creators" },
    ],
  },
  { label: "Brands", href: "/brands" },
  { label: "Agencies", href: "/agencies" },
  { label: "Creators", href: "/creators" },
  { label: "Pricing", href: "/pricing" },
  { label: "Free Tools", href: "/tools" },
];

export function PublicHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-[#0f1e38] font-bold text-xl tracking-tight">Carvaan</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "px-3.5 py-2 text-sm rounded-lg transition-colors duration-150",
                  pathname === link.href
                    ? "text-[#0f1e38] font-semibold bg-[#eef2f9]"
                    : "text-slate-600 hover:text-[#0f1e38] hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" size="sm">
                Log in
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="primary" size="sm">
                Book Demo
              </Button>
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-slate-600 hover:text-[#0f1e38] hover:bg-slate-100 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-slate-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navLinks.slice(1).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block px-3 py-2.5 rounded-lg text-sm transition-colors",
                  pathname === link.href
                    ? "text-[#0f1e38] font-semibold bg-[#eef2f9]"
                    : "text-slate-600 hover:text-[#0f1e38] hover:bg-slate-50"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-3 flex flex-col gap-2">
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="outline" size="md" className="w-full">
                  Log in
                </Button>
              </Link>
              <Link href="/login" onClick={() => setMobileOpen(false)}>
                <Button variant="primary" size="md" className="w-full">
                  Book Demo
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
