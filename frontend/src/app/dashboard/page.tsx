"use client";

import { motion } from "framer-motion";
import {
  Link2,
  MousePointerClick,
  TrendingUp,
  Activity,
  Copy,
  Check,
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  getLinks,
  getTopLinks,
  getRecentVisitors,
  getCtrStats,
  getDashboardStats,
  getStoredUser,
  type Link,
  type RecentVisitor,
  type CtrStats,
  type DashboardStats,
  type User,
} from "@/lib/api";

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
  const [links, setLinks] = useState<Link[]>([]);
  const [topPerforming, setTopPerforming] = useState<Link[]>([]);
  const [visitors, setVisitors] = useState<RecentVisitor[]>([]);
  const [dashboardStats, setDashboardStats] = useState<DashboardStats | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [linksRes, topRes, visitorsRes, dashRes] = await Promise.all([
          getLinks({ limit: 5 }),
          getTopLinks(5),
          getRecentVisitors(5),
          getDashboardStats(),
        ]);
        setLinks(linksRes.links);
        setTopPerforming(topRes);
        setVisitors(visitorsRes);
        setDashboardStats(dashRes);
        setUser(getStoredUser());
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const statCards = [
    {
      label: "Total Links",
      value: dashboardStats ? String(dashboardStats.totalLinks) : "—",
      change: dashboardStats ? `${dashboardStats.activeLinks} active` : "—",
      icon: Link2,
      color: "from-brand/10 to-brand/5",
      iconColor: "text-brand",
    },
    {
      label: "Total Clicks",
      value: dashboardStats ? dashboardStats.totalClicks.toLocaleString() : "—",
      change: dashboardStats ? `${dashboardStats.averageClicksPerLink} avg per link` : "—",
      icon: MousePointerClick,
      color: "from-blue-500/10 to-blue-500/5",
      iconColor: "text-blue-500",
    },
    {
      label: "Active Plan",
      value: user?.plan || "Free",
      change: user
        ? `${user.linksUsed.toLocaleString()} / ${user.linkLimit.toLocaleString()} links used`
        : "—",
      icon: Activity,
      color: "from-amber-500/10 to-amber-500/5",
      iconColor: "text-amber-500",
    },
  ];

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-6 h-6 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
      </div>
    );
  }

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
        {/* Recent visitors */}
        <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Recent Visitors
          </h2>
          <div className="space-y-3">
            {visitors.length === 0 ? (
              <p className="text-sm text-muted-foreground">No visitors yet.</p>
            ) : (
              visitors.map((visitor, i) => (
                <div
                  key={visitor.id || i}
                  className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground flex-shrink-0">
                      {visitor.country || "—"}
                    </div>
                    <div className="min-w-0">
                      <div className="text-sm text-foreground truncate">
                        {visitor.city || "Unknown"}, {visitor.country || "Unknown"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {visitor.device || "Unknown"} · {visitor.browser || "Unknown"}
                      </div>
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">
                    {new Date(visitor.timestamp).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        </motion.div>

        {/* Top performing links */}
        <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Top Performing Links
          </h2>
          <div className="space-y-3">
            {topPerforming.length === 0 ? (
              <p className="text-sm text-muted-foreground">No links yet.</p>
            ) : (
              topPerforming.map((link) => (
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
              ))
            )}
          </div>
        </motion.div>
      </div>

      {/* Recent links */}
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
              {links.length === 0 ? (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                    No links yet. Create your first link!
                  </td>
                </tr>
              ) : (
                links.map((link) => (
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
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>
    </motion.div>
  );
}