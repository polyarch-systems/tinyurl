"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Link2,
  Sparkles,
  Zap,
  ArrowRight,
} from "lucide-react";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

function FloatingParticle({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={`absolute rounded-full ${className}`}
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.4, 0],
        scale: [0, 1, 0],
        y: [0, -40],
        x: [0, 20],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

export function HeroSection() {
  const [url, setUrl] = useState("");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16 sm:pt-18">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-br from-brand/10 via-transparent to-transparent rounded-full blur-3xl" />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-tl from-brand/5 via-transparent to-transparent rounded-full blur-3xl" />
        <FloatingParticle className="w-2 h-2 bg-brand/30 top-1/4 left-1/3" delay={0} />
        <FloatingParticle className="w-1.5 h-1.5 bg-brand/20 top-1/3 right-1/4" delay={1} />
        <FloatingParticle className="w-1 h-1 bg-brand/25 bottom-1/3 left-1/4" delay={2} />
        <FloatingParticle className="w-2 h-2 bg-brand/20 bottom-1/4 right-1/3" delay={0.5} />
        <FloatingParticle className="w-1 h-1 bg-brand/30 top-2/3 left-2/3" delay={1.5} />
      </div>

      <div className="relative z-10 w-full max-w-3xl mx-auto px-4 sm:px-6">
        <div className="text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-xs font-medium text-brand mb-6 sm:mb-8"
          >
            <Sparkles className="w-3 h-3" />
            YC S24 · Trusted by 10,000+ teams
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1]"
          >
            Shorten links.
            <br />
            <span className="text-gradient">Own your brand.</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 sm:mt-6 text-base sm:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed"
          >
            The modern link management platform for teams who care about
            performance, security, and brand presence.
          </motion.p>

          {/* URL Input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 sm:mt-10 max-w-xl mx-auto"
          >
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (url) {
                  window.location.href = `${appUrl}/signin`;
                }
              }}
              className="relative flex items-center gap-2 p-1.5 rounded-2xl bg-card border border-border/60 shadow-lg shadow-black/5 dark:shadow-black/20 transition-all duration-300"
            >
              <div className="flex-1 flex items-center gap-2 pl-3 sm:pl-4">
                <Link2 className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                <input
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="Paste your long URL here..."
                  className="flex-1 text-left text-sm sm:text-base py-2.5 bg-transparent text-foreground placeholder-muted-foreground/50 outline-none min-w-0"
                />
              </div>
              <button
                type="submit"
                className="relative inline-flex h-10 sm:h-11 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-brand to-brand-dark px-4 sm:px-5 text-sm font-medium text-white shadow-lg shadow-brand/20 hover:shadow-brand/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 whitespace-nowrap"
              >
                <Zap className="w-4 h-4" />
                <span>Shorten URL</span>
                <ArrowRight className="w-3.5 h-3.5 hidden sm:inline" />
              </button>
            </form>
          </motion.div>

          {/* Trust Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 sm:mt-16 flex flex-col items-center gap-4"
          >
            <p className="text-xs text-muted-foreground uppercase tracking-widest font-medium">
              Trusted by teams from
            </p>
            <div className="flex items-center gap-6 sm:gap-10 flex-wrap justify-center opacity-40">
              {["Vercel", "Linear", "Raycast", "Cal.com", "Supabase"].map(
                (name) => (
                  <span
                    key={name}
                    className="text-sm font-semibold text-foreground/60"
                  >
                    {name}
                  </span>
                )
              )}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-border/40 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-muted-foreground/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}