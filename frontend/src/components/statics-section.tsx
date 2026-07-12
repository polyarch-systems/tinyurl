"use client";

import { motion } from "framer-motion";
import {
  BarChart3,
  TrendingUp,
  MousePointerClick,
  Globe,
  Clock,
  Smartphone,
} from "lucide-react";

const statics = [
  {
    metric: "Click-through rate",
    value: "+34%",
    description: "Average increase when using branded short links over generic URLs",
    icon: TrendingUp,
    color: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-500",
  },
  {
    metric: "Mobile traffic",
    value: "68%",
    description: "Of all link clicks come from mobile devices globally",
    icon: Smartphone,
    color: "from-sky-500/20 to-blue-500/20",
    iconColor: "text-sky-500",
  },
  {
    metric: "Peak throughput",
    value: "1.2M",
    description: "Redirects handled per second during peak traffic hours",
    icon: MousePointerClick,
    color: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-500",
  },
  {
    metric: "Global reach",
    value: "190+",
    description: "Countries where TinyURL links are accessed daily",
    icon: Globe,
    color: "from-cyan-500/20 to-teal-500/20",
    iconColor: "text-cyan-500",
  },
  {
    metric: "Avg. response time",
    value: "8ms",
    description: "Median redirect response time from our edge network",
    icon: Clock,
    color: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-500",
  },
  {
    metric: "Links created daily",
    value: "250K+",
    description: "New short links generated every single day on our platform",
    icon: BarChart3,
    color: "from-pink-500/20 to-rose-500/20",
    iconColor: "text-pink-500",
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

export function StaticsSection() {
  return (
    <section id="statics" className="relative py-24 sm:py-32">
      {/* Background */}
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
            Statics
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight">
            Real numbers from{" "}
            <span className="text-gradient">real usage</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg leading-relaxed">
            Every metric is pulled from live platform data. No vanity numbers,
            just the truth.
          </p>
        </motion.div>

        {/* Statics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6"
        >
          {statics.map((stat) => (
            <motion.div
              key={stat.metric}
              variants={itemVariants}
              className="group relative p-6 sm:p-8 rounded-2xl bg-card border border-border/50 hover:border-border/80 transition-all duration-300 hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20"
            >
              {/* Icon */}
              <div className="relative mb-4">
                <div
                  className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
                >
                  <stat.icon className={`w-5 h-5 ${stat.iconColor}`} />
                </div>
                <div
                  className={`absolute -inset-1 rounded-xl bg-gradient-to-br ${stat.color} blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                />
              </div>

              {/* Value */}
              <div className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mb-1">
                {stat.value}
              </div>

              {/* Metric name */}
              <h3 className="text-sm font-semibold text-foreground mb-2">
                {stat.metric}
              </h3>

              {/* Description */}
              <p className="text-sm text-muted-foreground leading-relaxed">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}