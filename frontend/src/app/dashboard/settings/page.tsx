"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  User,
  CreditCard,
  Link2,
  BarChart3,
  Shield,
  ArrowRight,
} from "lucide-react";
import { getStoredUser, type User as UserType } from "@/lib/api";

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

export default function SettingsPage() {
  const [user] = useState<UserType | null>(() => getStoredUser());

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="max-w-4xl mx-auto"
    >
      {/* Page header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
          Settings
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account, subscription, and preferences.
        </p>
      </motion.div>

      <div className="space-y-6">
        {/* Account Information */}
        <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand/10 to-brand/5 flex items-center justify-center">
              <User className="w-4 h-4 text-brand" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Account Information</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Email
              </label>
              <div className="text-sm text-foreground bg-muted/30 rounded-xl px-3.5 py-2.5 border border-border/50">
                {user?.email || "—"}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Name
              </label>
              <div className="text-sm text-foreground bg-muted/30 rounded-xl px-3.5 py-2.5 border border-border/50">
                {user?.name || "—"}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Member Since
              </label>
              <div className="text-sm text-foreground bg-muted/30 rounded-xl px-3.5 py-2.5 border border-border/50">
                {user?.joinedAt
                  ? new Date(user.joinedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })
                  : "—"}
              </div>
            </div>
            <div>
              <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                Team Members
              </label>
              <div className="text-sm text-foreground bg-muted/30 rounded-xl px-3.5 py-2.5 border border-border/50">
                {user?.teamMembers ?? "—"}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Subscription Plan */}
        <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 flex items-center justify-center">
              <CreditCard className="w-4 h-4 text-amber-500" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Subscription Plan</h2>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-xl bg-gradient-to-br from-brand/[0.04] to-transparent border border-brand/20 mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-bold text-foreground">
                  {user?.plan || "Free"}
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-semibold text-emerald-500">
                  Active
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-0.5">
                {user?.plan === "Pro" ? "$29/month" : "Free tier"} ·{" "}
                {user?.linkLimit?.toLocaleString() || "—"} links/month
              </p>
            </div>
            <button className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-brand to-brand-dark px-4 text-sm font-medium text-white shadow-lg shadow-brand/20 hover:shadow-brand/30 transition-all duration-300 active:scale-[0.98] self-start sm:self-auto">
              Upgrade Plan
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Usage */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-xs font-medium text-muted-foreground">Link Usage</span>
                <span className="text-xs text-muted-foreground">
                  {user?.linksUsed?.toLocaleString() || "0"} / {user?.linkLimit?.toLocaleString() || "—"}
                </span>
              </div>
              <div className="h-2 rounded-full bg-muted overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-brand to-brand-dark transition-all duration-500"
                  style={{
                    width: `${Math.min(
                      ((user?.linksUsed || 0) / (user?.linkLimit || 1)) * 100,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div variants={itemVariants} className="rounded-2xl bg-card border border-border/50 p-5 sm:p-6">
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-violet-500/10 to-violet-500/5 flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-violet-500" />
            </div>
            <h2 className="text-sm font-semibold text-foreground">Usage Overview</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Link2 className="w-3.5 h-3.5" />
                Links Created
              </div>
              <div className="text-xl font-bold text-foreground">
                {user?.linksUsed?.toLocaleString() || "0"}
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">
                of {user?.linkLimit?.toLocaleString() || "—"} limit
              </div>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <BarChart3 className="w-3.5 h-3.5" />
                Plan
              </div>
              <div className="text-xl font-bold text-foreground">
                {user?.plan || "Free"}
              </div>
              <div className="text-[11px] text-emerald-500 mt-0.5 font-medium">
                {user?.plan === "Pro" ? "Premium features" : "Basic features"}
              </div>
            </div>
            <div className="p-4 rounded-xl bg-muted/30 border border-border/50">
              <div className="flex items-center gap-2 text-xs text-muted-foreground mb-1">
                <Shield className="w-3.5 h-3.5" />
                Team
              </div>
              <div className="text-xl font-bold text-foreground">
                {user?.teamMembers ?? 0}
              </div>
              <div className="text-[11px] text-emerald-500 mt-0.5 font-medium">
                Team members
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}