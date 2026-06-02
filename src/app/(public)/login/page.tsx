"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setDemoRole, demoCredentials } from "@/lib/auth";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

const roleCards: { role: UserRole; label: string; description: string; color: string }[] = [
  { role: "admin", label: "Super Admin", description: "Platform-wide oversight", color: "border-[#7a9dd0] hover:border-[#3060a8] hover:bg-[#eef2f9]" },
  { role: "agency", label: "Agency", description: "Maqsad Creative demo", color: "border-teal-300 hover:border-teal-500 hover:bg-teal-50" },
  { role: "brand", label: "Brand", description: "Gleam Skincare demo", color: "border-sky-300 hover:border-sky-500 hover:bg-sky-50" },
  { role: "creator", label: "Creator", description: "Creator profile demo", color: "border-purple-300 hover:border-purple-500 hover:bg-purple-50" },
];

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const loginAsRole = (role: UserRole) => {
    setLoading(true);
    setTimeout(() => {
      setDemoRole(role);
      router.push(`/dashboard/${role}`);
    }, 600);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const matched = (Object.entries(demoCredentials) as [UserRole, typeof demoCredentials[UserRole]][]).find(
      ([, cred]) => cred.email === email && cred.password === password
    );
    if (matched) {
      loginAsRole(matched[0]);
    } else {
      setError("Email or password is incorrect. Use the demo credentials below or click a role button.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden md:flex md:w-5/12 lg:w-1/2 flex-col justify-between p-10 lg:p-14" style={{backgroundColor: "#080f1e"}}>
        <Link href="/" className="flex items-center">
          <span className="text-white font-bold text-xl">Carvaan</span>
        </Link>
        <div>
          <div className="w-10 h-1 rounded-full mb-6" style={{backgroundColor: "#20a4b0"}} />
          <blockquote className="text-xl font-semibold text-white leading-relaxed mb-6">
            "Carvaan brought structure to our creator campaigns. The approval workflow alone saved us days of back-and-forth."
          </blockquote>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center" style={{backgroundColor: "#1e3d72"}}>
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <p className="text-sm font-semibold" style={{color: "#d5e0f1"}}>Amira Al Qassimi</p>
              <p className="text-sm" style={{color: "#64748b"}}>Founder, Maqsad Creative</p>
            </div>
          </div>
        </div>
        <p className="text-xs" style={{color: "#475569"}}>Creator marketing, managed with clarity.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-sm mx-auto">
          {/* Mobile logo */}
          <div className="md:hidden mb-8">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-[#0f1e38] font-bold text-xl">Carvaan</span>
            </Link>
          </div>

          <h1 className="text-2xl font-bold text-[#080f1e] mb-1">Welcome back</h1>
          <p className="text-sm text-slate-500 mb-8">Sign in to your Carvaan account</p>

          {/* Demo role buttons */}
          <div className="mb-6">
            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Quick Demo Access</p>
            <div className="grid grid-cols-2 gap-2">
              {roleCards.map((card) => (
                <button
                  key={card.role}
                  onClick={() => loginAsRole(card.role)}
                  disabled={loading}
                  className={cn(
                    "p-3 rounded-xl border text-left transition-all disabled:opacity-50 disabled:cursor-not-allowed",
                    card.color
                  )}
                >
                  <p className="text-xs font-semibold text-slate-800">{card.label}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{card.description}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-slate-200" />
            <span className="text-xs text-slate-400">or sign in with email</span>
            <div className="flex-1 h-px bg-slate-200" />
          </div>

          {/* Login form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <Input
              label="Email address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <Input
              label="Password"
              type={showPw ? "text" : "password"}
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              rightIcon={
                <button type="button" onClick={() => setShowPw(!showPw)} className="focus:outline-none">
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              }
              autoComplete="current-password"
            />
            {error && <p className="text-sm text-red-600">{error}</p>}
            <Button type="submit" variant="primary" size="md" className="w-full" loading={loading}>
              Sign in
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-4 flex items-center justify-between text-sm">
            <Link href="/reset-password" className="text-teal-600 hover:underline">Forgot password?</Link>
            <Link href="/signup" className="text-slate-600 hover:text-[#0f1e38]">No account? Sign up</Link>
          </div>

          {/* Demo credentials hint */}
          <div className="mt-8 bg-slate-100 rounded-xl p-4">
            <p className="text-xs font-semibold text-slate-600 mb-2">Demo Credentials</p>
            <div className="space-y-1">
              {(Object.entries(demoCredentials) as [UserRole, typeof demoCredentials[UserRole]][]).map(([role, cred]) => (
                <div key={role} className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 capitalize">{role}:</span>
                  <span className="text-slate-700 font-mono">{cred.email} / {cred.password}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
