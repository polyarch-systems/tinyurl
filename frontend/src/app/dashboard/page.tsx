"use client";

import { motion } from "framer-motion";
import {
  Link2,
  MousePointerClick,
  TrendingUp,
  Activity,
  ExternalLink,
  Copy,
  Check,
  ArrowUpRight,
} from "lucide-react";
import { useState } from "react";
import { mockLinks, recentVisitors, accountInfo } from "@/lib/mock-data";

const statCards = [
  {
    label: "Total Links",
    value: mockLinks.length.toString(),
    change: "+2 this week",
    icon: Link2,
    color: "from-brand/10 to-brand/5",
    iconColor: "text-brand",
  },
  {
    label: "Total Visits",
    value: "13,240",
    change: "+18.2% vs last week",
    icon: MousePointerClick,
    color: "from-emerald-500/10 to-emerald-500/5",
    iconColor: "text-emerald-500",
  },
  {
    label: "Total Clicks",
    value: "21,876",
    change: "+12.4% vs last week",
    icon: TrendingUp,
    color: "from-violet-500/10 to-violet-500/5",
    iconColor: "text-violet-500",
  },
  {
    label: "Active Plan",
    value: accountInfo.plan,
    change: `${accountInfo.linksUsed.toLocaleString()} / ${accountInfo.linkLimit.toLocaleString()} links used`,
    icon: Activity,
    color: "from-amber-500/10 to-amber-500/5",
    iconColor: "text-amber-500",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export default function DashboardPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-6xl mx-auto"
    >
      {/* Page header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Overview of your link performance and account activity.
        </p>
      </motion.div>

      {/* Stat cards */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >
        {statCards.map((stat) => (
          <motion.div
            key={stat.label}
            variants={itemVariants}
            className="relative p-5 rounded-2xl bg-card border border-border/50"
          >
            <div className="flex items-start justify-between mb-3">
              <div
                className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}
              >
                <stat.icon className={`w-4.5 h-4.5 ${stat.iconColor}`} />
              </div>
            </div>
            <div className="text-2xl font-bold tracking-tight text-foreground">
              {stat.value}
            </div>
            <div className="text-xs text-muted-foreground mt-0.5">
              {stat.label}
            </div>
            <div className="text-[11px] text-emerald-500 mt-1.5 font-medium">
              {stat.change}
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent activity + Top links */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Recent activity */}
        <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Recent Visitors
          </h2>
          <div className="space-y-3">
            {recentVisitors.slice(0, 5).map((visitor, i) => (
              <div
                key={i}
                className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground flex-shrink-0">
                    {visitor.country}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm text-foreground truncate">
                      {visitor.city}, {visitor.country}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {visitor.device} · {visitor.browser}
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                  {visitor.time}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Top performing links */}
        <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Top Performing Links
          </h2>
          <div className="space-y-3">
            {[...mockLinks]
              .sort((a, b) => b.clicks - a.clicks)
              .slice(0, 5)
              .map((link) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                >
                  <div className="min-w-0 flex-1 mr-3">
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-medium text-foreground truncate">
                        {link.shortUrl}
                      </span>
                      <button
                        onClick={() => handleCopy(link.shortUrl, link.id)}
                        className="flex-shrink-0 w-5 h-5 flex items-center justify-center rounded hover:bg-muted transition-colors"
                      >
                        {copiedId === link.id ? (
                          <Check className="w-3 h-3 text-green-500" />
                        ) : (
                          <Copy className="w-3 h-3 text-muted-foreground" />
                        )}
                      </button>
                    </div>
                    <div className="text-xs text-muted-foreground truncate mt-0.5">
                      {link.originalUrl}
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 flex-shrink-0">
                    <span className="text-sm font-semibold text-foreground">
                      {link.clicks.toLocaleString()}
                    </span>
                    <span className="text-xs text-muted-foreground">clicks</span>
                  </div>
                </div>
              ))}
          </div>
        </motion.div>
      </div>

      {/* Quick links */}
      <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5 sm:p-6">
        <h2 className="text-sm font-semibold text-foreground mb-4">
          Recent Links
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/30">
                <th className="text-left py-2.5 px-2 text-xs font-medium text-muted-foreground">Short URL</th>
                <th className="text-left py-2.5 px-2 text-xs font-medium text-muted-foreground hidden sm:table-cell">Original</th>
                <th className="text-right py-2.5 px-2 text-xs font-medium text-muted-foreground">Clicks</th>
                <th className="text-right py-2.5 px-2 text-xs font-medium text-muted-foreground hidden md:table-cell">Status</th>
              </tr>
            </thead>
            <tbody>
              {mockLinks.slice(0, 5).map((link) => (
                <tr key={link.id} className="border-b border-border/20 last:border-0">
                  <td className="py-3 px-2">
                    <span className="text-brand font-medium">{link.shortUrl}</span>
                  </td>
                  <td className="py-3 px-2 text-muted-foreground truncate max-w-[200px] hidden sm:table-cell">
                    {link.originalUrl}
                  </td>
                  <td className="py-3 px-2 text-right font-medium text-foreground">
                    {link.clicks.toLocaleString()}
                  </td>
                  <td className="py-3 px-2 text-right hidden md:table-cell">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${
                        link.status === "active"
                          ? "bg-emerald-500/10 text-emerald-500"
                          : link.status === "expired"
                          ? "bg-amber-500/10 text-amber-500"
                          : "bg-red-500/10 text-red-500"
                      }`}
                    >
                      {link.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}