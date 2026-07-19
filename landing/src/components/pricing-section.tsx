"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ArrowRight, Sparkles } from "lucide-react";

const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started with link shortening.",
    price: { monthly: "$0", annually: "$0" },
    features: [
      "1,000 links per month",
      "Basic click analytics",
      "Standard short links",
      "24-hour link history",
      "Community support",
    ],
    cta: "Get Started Free",
    popular: false,
  },
  {
    name: "Pro",
    description: "For professionals and small teams who need more power.",
    price: { monthly: "$29", annually: "$24" },
    features: [
      "50,000 links per month",
      "Advanced analytics & insights",
      "Custom branded domains",
      "Link expiration & passwords",
      "API access (5,000 req/hr)",
      "Priority email support",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Business",
    description: "For growing teams that need enterprise-level control.",
    price: { monthly: "$99", annually: "$79" },
    features: [
      "Unlimited links",
      "Real-time analytics dashboard",
      "Multiple custom domains",
      "Team collaboration & roles",
      "API access (50,000 req/hr)",
      "SSO & SAML",
      "Dedicated account manager",
      "99.99% SLA guarantee",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function PricingSection() {
  const [annually, setAnnually] = useState(false);

  return (
    <section id="pricing" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12 sm:mb-16"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-xs font-medium text-brand mb-4">
            <Sparkles className="w-3 h-3" />
            Pricing
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Simple, transparent{" "}
            <span className="text-gradient">pricing</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            No hidden fees. No surprises. Start for free, upgrade when you grow.
          </p>
        </motion.div>

        {/* Toggle */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex items-center justify-center gap-3 mb-10 sm:mb-14"
        >
          <span
            className={`text-sm font-medium transition-colors duration-200 ${
              !annually ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setAnnually(!annually)}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
              annually ? "bg-brand" : "bg-border"
            }`}
          >
            <div
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                annually ? "translate-x-5" : "translate-x-0"
              }`}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors duration-200 ${
              annually ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            Annually
            <span className="ml-1.5 inline-flex items-center px-1.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-semibold text-emerald-500">
              Save 20%
            </span>
          </span>
        </motion.div>

        {/* Plans Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto"
        >
          {plans.map((plan) => (
            <motion.div
              key={plan.name}
              variants={cardVariants}
              className={`relative flex flex-col rounded-2xl border p-6 sm:p-8 transition-all duration-300 ${
                plan.popular
                  ? "bg-gradient-to-b from-brand/[0.04] to-transparent border-brand/30 shadow-lg shadow-brand/5"
                  : "bg-card border-border/50 hover:border-border/80 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20"
              }`}
            >
              {/* Popular badge */}
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 inline-flex items-center gap-1 px-3 py-1 rounded-full bg-gradient-to-r from-brand to-brand-dark text-[11px] font-semibold text-white shadow-lg shadow-brand/20">
                  <Sparkles className="w-3 h-3" />
                  Most Popular
                </div>
              )}

              {/* Plan name & description */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-foreground">
                  {plan.name}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold tracking-tight text-foreground">
                    {annually ? plan.price.annually : plan.price.monthly}
                  </span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>
                {annually && plan.price.annually !== "$0" && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    ${parseInt(plan.price.monthly) * 12} billed annually
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="flex-1 space-y-3 mb-8">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2.5">
                    <div className="mt-0.5 w-4 h-4 rounded-full bg-brand/10 flex items-center justify-center flex-shrink-0">
                      <Check className="w-2.5 h-2.5 text-brand" />
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <a
                href={`${appUrl}/signup`}
                className={`inline-flex h-11 items-center justify-center gap-1.5 rounded-xl text-sm font-medium transition-all duration-300 active:scale-[0.98] ${
                  plan.popular
                    ? "bg-gradient-to-br from-brand to-brand-dark text-white shadow-lg shadow-brand/20 hover:shadow-brand/30 hover:scale-[1.02]"
                    : "border border-border bg-background hover:bg-muted text-foreground"
                }`}
              >
                {plan.cta}
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}