"use client";

import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

export function CTASection() {
  return (
    <section className="relative py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-brand via-brand-dark to-brand px-6 sm:px-12 lg:px-16 py-12 sm:py-16 lg:py-20 text-center"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.05)_0%,transparent_50%)]" />
          </div>

          {/* Content */}
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-xs font-medium text-white/90 mb-6"
            >
              <Sparkles className="w-3 h-3" />
              Get started in seconds
            </motion.div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white">
              Ready to simplify your links?
            </h2>
            <p className="mt-4 text-base sm:text-lg text-white/70 max-w-lg mx-auto leading-relaxed">
              Join thousands of teams already using TinyURL. Start shortening
              links for free — no credit card required.
            </p>

            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <a
                href={`${appUrl}/signup`}
                className="inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl bg-white px-6 sm:px-8 text-sm font-semibold text-brand shadow-lg shadow-black/10 hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Start Shortening Free
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href={`${appUrl}/signin`}
                className="inline-flex h-11 sm:h-12 items-center justify-center gap-2 rounded-xl border border-white/20 px-6 sm:px-8 text-sm font-medium text-white/90 hover:bg-white/10 transition-all duration-300"
              >
                Talk to Sales
              </a>
            </div>

            <p className="mt-6 text-xs text-white/50">
              Free plan includes 1,000 links/month · No credit card required
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}