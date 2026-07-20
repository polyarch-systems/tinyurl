"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  TrendingUp,
  MousePointerClick,
  BarChart3,
} from "lucide-react";
import {
  getVisitsOverTime,
  getTopAnalyticsLinks,
  getRecentVisitors,
  getCtrStats,
  type VisitPoint,
  type TopLinkAnalytics,
  type RecentVisitor,
  type CtrStats,
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

function MiniBarChart({ data }: { data: VisitPoint[] }) {
  const max = Math.max(...data.map((d) => d.visits));
  return (
    <div className="flex items-end gap-1.5 h-32 sm:h-40 pt-4">
      {data.map((point, i) => (
        <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
          <span className="text-[10px] text-muted-foreground font-medium">
            {point.visits.toLocaleString()}
          </span>
          <div
            className="w-full rounded-md bg-gradient-to-t from-brand/60 to-brand/30 transition-all duration-500"
            style={{ height: `${(point.visits / max) * 100}%` }}
          />
          <span className="text-[10px] text-muted-foreground">{point.date}</span>
        </div>
      ))}
    </div>
  );
}

export default function AnalyticsPage() {
  const [visits, setVisits] = useState<VisitPoint[]>([]);
  const [topLinks, setTopLinks] = useState<TopLinkAnalytics[]>([]);
  const [visitors, setVisitors] = useState<RecentVisitor[]>([]);
  const [ctr, setCtr] = useState<CtrStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [visitsRes, topRes, visitorsRes, ctrRes] = await Promise.all([
          getVisitsOverTime("7d"),
          getTopAnalyticsLinks(5),
          getRecentVisitors(10),
          getCtrStats(),
        ]);
        setVisits(visitsRes);
        setTopLinks(topRes);
        setVisitors(visitorsRes);
        setCtr(ctrRes);
      } catch {
        // silent
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const totalVisits = visits.reduce((sum, d) => sum + d.visits, 0);

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
          Analytics
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Detailed insights into your link performance.
        </p>
      </motion.div>

      {/* CTR Stats */}
      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6"
      >
        <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <TrendingUp className="w-3.5 h-3.5" />
            Average CTR
          </div>
          <div className="text-2xl font-bold text-foreground">
            {ctr?.ctr != null ? `${ctr.ctr}%` : "—"}
          </div>
          <div className="text-xs text-emerald-500 mt-1 font-medium">
            {ctr?.totalClicks != null ? `${ctr.totalClicks} total clicks` : ""}
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <BarChart3 className="w-3.5 h-3.5" />
            Total Unique Visitors
          </div>
          <div className="text-2xl font-bold text-foreground">
            {ctr?.totalUniques != null ? ctr.totalUniques.toLocaleString() : "—"}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Unique click count
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5">
          <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
            <MousePointerClick className="w-3.5 h-3.5" />
            Total Visits
          </div>
          <div className="text-2xl font-bold text-foreground">
            {totalVisits.toLocaleString()}
          </div>
          <div className="text-xs text-muted-foreground mt-1">
            Last 7 days
          </div>
        </motion.div>
      </motion.div>

      {/* Visits over time chart */}
      {visits.length > 0 && (
        <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5 sm:p-6 mb-6">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-sm font-semibold text-foreground">Visits Over Time</h2>
            <span className="text-xs text-muted-foreground">Last 7 days</span>
          </div>
          <MiniBarChart data={visits} />
        </motion.div>
      )}

      {/* Top links + Recent visitors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Top performing links */}
        <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5 sm:p-6">
          <h2 className="text-sm font-semibold text-foreground mb-4">
            Top Performing Links
          </h2>
          <div className="space-y-3">
            {topLinks.length === 0 ? (
              <p className="text-sm text-muted-foreground">No data yet.</p>
            ) : (
              topLinks.map((link, i) => (
                <div
                  key={link.id}
                  className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
                >
                  <div className="flex items-center gap-3 min-w-0 flex-1 mr-3">
                    <span className="text-xs font-bold text-muted-foreground w-4 flex-shrink-0">
                      {i + 1}
                    </span>
                    <div className="min-w-0">
                      <div className="text-sm text-foreground truncate">
                        {link.shortCode}
                      </div>
                      <div className="text-xs text-muted-foreground truncate">
                        {link.originalUrl}
                      </div>
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
      </div>
    </motion.div>
  );
}