import type { Metadata } from "next";
import { SignUpForm } from "@/components/signup-form";

export const metadata: Metadata = {
  title: "Sign Up — TinyURL",
  description: "Create a TinyURL account to start shortening links.",
};

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-brand/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-brand/5 via-transparent to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto px-4">
        <SignUpForm />
      </div>
    </div>
  );
}
