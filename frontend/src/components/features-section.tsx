"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  Globe,
  Link2,
  Shield,
  Zap,
  Users,
} from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Redirects in under 10ms globally. Our edge network ensures your links are always fast, no matter where your audience is.",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
  },
  {
    icon: Globe,
    title: "Custom Domains",
    description:
      "Use your own domain for branded short links. Increase click-through rates by up to 34% with trusted, recognizable URLs.",
    gradient: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-500",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description:
      "Real-time click tracking, geographic data, device breakdowns, and referral sources. Know exactly how your links perform.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description:
      "Link expiration, password protection, IP allowlisting, and SOC 2 compliance. Your links are safe with us.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
  },
  {
    icon: Users,
    title: "Team Collaboration",
    description:
      "Shared workspaces, role-based access, and audit logs. Collaborate with your team without compromising control.",
    gradient: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-500",
  },
  {
    icon: Link2,
    title: "API-First Platform",
    description:
      "RESTful API with SDKs for every major language. Integrate link shortening into your workflow in minutes.",
    gradient: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      {/* Section background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/[0.02] to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand/10 border border-brand/20 text-xs font-medium text-brand mb-4">
            Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Everything you need to{" "}
            <span className="text-gradient">manage links</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            From shortening to analytics, we provide all the tools to make your
            links work harder for you.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={itemVariants}
              className="group relative p-6 sm:p-8 rounded-2xl bg-card border border-border/50 hover:border-border/80 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20"
            >
              {/* Icon */}
              <div className="relative mb-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center`}
                >
                  <feature.icon className={`w-5 h-5 ${feature.iconColor}`} />
                </div>
                <div
                  className={`absolute -inset-1 rounded-xl bg-gradient-to-br ${feature.gradient} blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>

              {/* Content */}
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}