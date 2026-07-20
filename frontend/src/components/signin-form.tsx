"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Link2, Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { signIn } from "@/lib/auth";
import Link from "next/link";

function GitHubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="4" />
      <line x1="2" y1="12" x2="6" y2="12" />
      <line x1="18" y1="12" x2="22" y2="12" />
      <line x1="12" y1="2" x2="12" y2="6" />
      <line x1="12" y1="18" x2="12" y2="22" />
    </svg>
  );
}

export function SignInForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn(email, password);
      router.push("/");
    } catch {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Logo */}
      <div className="text-center mb-8">
        <Link href="/" className="inline-flex items-center gap-2.5 group mb-6">
          <div className="relative">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand to-brand-dark flex items-center justify-center shadow-lg shadow-brand/20">
              <Link2 className="w-[18px] h-[18px] text-white" />
            </div>
          </div>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to your TinyURL account
        </p>
      </div>

      {/* Social Buttons */}
      <div className="flex flex-col gap-2 mb-6">
        <button className="inline-flex h-10 items-center justify-center gap-2.5 rounded-xl border border-border bg-background hover:bg-muted text-sm font-medium text-foreground transition-all duration-200 active:scale-[0.98]">
          <GitHubIcon />
          Continue with GitHub
        </button>
        <button className="inline-flex h-10 items-center justify-center gap-2.5 rounded-xl border border-border bg-background hover:bg-muted text-sm font-medium text-foreground transition-all duration-200 active:scale-[0.98]">
          <GoogleIcon />
          Continue with Google
        </button>
      </div>

      {/* Divider */}
      <div className="relative mb-6">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with email
          </span>
        </div>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-foreground mb-1.5"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Mail className="w-4 h-4 text-muted-foreground" />
            </div>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-10 pl-10 pr-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-brand/40 focus:shadow-glow-sm"
              required
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-foreground"
            >
              Password
            </label>
            <Link
              href="#"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Lock className="w-4 h-4 text-muted-foreground" />
            </div>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full h-10 pl-10 pr-10 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-brand/40 focus:shadow-glow-sm"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-brand to-brand-dark text-sm font-medium text-white shadow-lg shadow-brand/20 hover:shadow-brand/30 hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/signup"
          className="font-medium text-foreground hover:text-brand transition-colors"
        >
          Create one
        </Link>
      </p>
    </motion.div>
  );
}
