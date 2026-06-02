"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Building2, Briefcase, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { setDemoRole } from "@/lib/auth";
import type { UserRole } from "@/types";
import { cn } from "@/lib/utils";

const roleOptions = [
  { role: "brand" as UserRole, icon: Building2, title: "Brand", description: "Run influencer campaigns for your brand or business." },
  { role: "agency" as UserRole, icon: Briefcase, title: "Agency", description: "Manage creator campaigns across multiple brand clients." },
  { role: "creator" as UserRole, icon: User, title: "Creator", description: "Join the Carvaan network and collaborate with brands." },
];

export default function SignupPage() {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: "", email: "", password: "", company: "", handle: "" });
  const [loading, setLoading] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) return;
    setLoading(true);
    setTimeout(() => {
      setDemoRole(selectedRole);
      router.push(`/dashboard/${selectedRole}`);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Left panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#080f1e] flex-col justify-between p-12">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="text-white font-bold text-xl">Carvaan</span>
        </Link>
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Join the GCC creator economy</h2>
          <div className="space-y-4">
            {["Brands find verified GCC creators", "Agencies manage campaigns at scale", "Creators get structured, paid collaborations"].map((item) => (
              <div key={item} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-teal-500 flex items-center justify-center flex-shrink-0">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="text-sm text-slate-300">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <p className="text-xs text-slate-600">Creator marketing, managed with clarity.</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col justify-center px-6 py-12 lg:px-16">
        <div className="w-full max-w-sm mx-auto">
          <div className="lg:hidden mb-8">
            <Link href="/" className="flex items-center gap-2.5">
              <span className="text-[#0f1e38] font-bold text-xl">Carvaan</span>
            </Link>
          </div>

          {step === 1 ? (
            <>
              <h1 className="text-2xl font-bold text-[#080f1e] mb-1">Create your account</h1>
              <p className="text-sm text-slate-500 mb-8">Select the account type that fits your needs</p>
              <div className="space-y-3">
                {roleOptions.map((opt) => (
                  <button
                    key={opt.role}
                    onClick={() => setSelectedRole(opt.role)}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-xl border text-left transition-all",
                      selectedRole === opt.role
                        ? "border-teal-500 bg-teal-50 ring-1 ring-teal-400"
                        : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                    )}
                  >
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0", selectedRole === opt.role ? "bg-teal-600" : "bg-slate-100")}>
                      <opt.icon className={cn("w-5 h-5", selectedRole === opt.role ? "text-white" : "text-slate-600")} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{opt.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{opt.description}</p>
                    </div>
                  </button>
                ))}
              </div>
              <Button
                variant="primary"
                size="md"
                className="w-full mt-6"
                disabled={!selectedRole}
                onClick={() => setStep(2)}
              >
                Continue
                <ArrowRight className="w-4 h-4" />
              </Button>
            </>
          ) : (
            <>
              <button onClick={() => setStep(1)} className="text-sm text-slate-500 hover:text-slate-700 mb-6 flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </button>
              <h1 className="text-2xl font-bold text-[#080f1e] mb-1">Your details</h1>
              <p className="text-sm text-slate-500 mb-8 capitalize">Signing up as: <strong>{selectedRole}</strong></p>
              <form onSubmit={handleSignup} className="space-y-4">
                <Input label="Full Name" placeholder="Your full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                <Input label="Email address" type="email" placeholder="you@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                <Input label="Password" type="password" placeholder="Create a strong password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
                {(selectedRole === "brand" || selectedRole === "agency") && (
                  <Input label={selectedRole === "brand" ? "Brand / Company Name" : "Agency Name"} placeholder={selectedRole === "brand" ? "Your brand name" : "Your agency name"} value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
                )}
                {selectedRole === "creator" && (
                  <Input label="Main Social Handle" placeholder="@yourhandle" value={form.handle} onChange={(e) => setForm({ ...form, handle: e.target.value })} />
                )}
                <Button type="submit" variant="primary" size="md" className="w-full" loading={loading}>
                  Create Account (Demo)
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </form>
            </>
          )}

          <p className="mt-6 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="text-teal-600 hover:underline font-medium">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
