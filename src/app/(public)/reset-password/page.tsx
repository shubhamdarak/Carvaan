"use client";

import Link from "next/link";
import { useState } from "react";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSent(true);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <span className="text-[#0f1e38] font-bold text-xl">Carvaan</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-card p-8">
          {!sent ? (
            <>
              <div className="text-center mb-7">
                <div className="w-12 h-12 bg-[#eef2f9] rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-6 h-6 text-[#1e3d72]" />
                </div>
                <h1 className="text-xl font-bold text-[#080f1e]">Reset your password</h1>
                <p className="text-sm text-slate-500 mt-2">
                  Enter the email address associated with your Carvaan account and we will send you a reset link.
                </p>
              </div>
              <form onSubmit={handleReset} className="space-y-4">
                <Input
                  label="Email address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <Button type="submit" variant="primary" size="md" className="w-full" loading={loading}>
                  Send Reset Link
                </Button>
              </form>
            </>
          ) : (
            <div className="text-center py-4">
              <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-xl font-bold text-[#080f1e] mb-2">Check your inbox</h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                If an account exists for <strong>{email}</strong>, you will receive a password reset link shortly. Please check your spam folder if you do not see it.
              </p>
              <div className="mt-6 p-3 bg-slate-50 rounded-lg border border-slate-200">
                <p className="text-xs text-slate-500">This is a demo. No email was actually sent.</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-6">
          <Link href="/login" className="inline-flex items-center gap-1.5 text-sm text-slate-600 hover:text-[#0f1e38] transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to sign in
          </Link>
        </div>
      </div>
    </div>
  );
}
