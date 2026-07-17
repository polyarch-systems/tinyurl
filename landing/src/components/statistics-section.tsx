"use client";

import { motion } from "framer-motion";
import { TrendingUp, Link2, MousePointerClick, Globe } from "lucide-react";

const stats = [
  {
    value: "10M+",
    label: "Links shortened",
    icon: Link2,
    description: "And counting every day",
  },
  {
    value: "99.99%",
    label: "Uptime",
    icon: Globe,
    description: "Enterprise-grade reliability",
  },
  {
    value: "10ms",
    label: "Avg. redirect time",
    icon: MousePointerClick,
    description: "Global edge network",
  },
  {
    value: "34%",
    label: "Higher CTR",
    icon: TrendingUp,
    description: "With branded links",
  },
];

const counterVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut" as const,
    },
  }),
};

export function StatisticsSection() {
  return (
    <section id="statistics" className="relative py-24 sm:py-32">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand/[0.03] to-transparent pointer-events-none" />

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
            Statistics
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Built for scale,{" "}
            <span className="text-gradient">proven by data</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Thousands of teams trust TinyURL to power their link management.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              custom={i}
              variants={counterVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="group relative p-6 sm:p-8 rounded-2xl bg-card border border-border/50 text-center"
            >
              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-brand/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              {/* Icon */}
              <div className="relative mx-auto mb-4 w-10 h-10 rounded-xl bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center">
                <stat.icon className="w-5 h-5 text-brand" />
              </div>

              {/* Value */}
              <div className="relative">
                <span className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                  {stat.value}
                </span>
              </div>

              {/* Label */}
              <p className="mt-1.5 text-sm font-medium text-foreground">
                {stat.label}
              </p>

              {/* Description */}
              <p className="mt-1 text-xs text-muted-foreground">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}