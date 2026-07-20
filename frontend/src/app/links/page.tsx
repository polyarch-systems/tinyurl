"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Copy,
  Check,
  ExternalLink,
  Trash2,
  Search,
  Plus,
  ArrowUpDown,
} from "lucide-react";
import {
  getLinks,
  createLink,
  deleteLink,
  type Link,
} from "@/lib/api";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: "easeOut" as const },
  },
};

type SortField = "clicks" | "createdAt";
type SortDir = "asc" | "desc";

import { DashboardLayout } from "@/components/dashboard-layout";

export default function LinksPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState<SortField>("createdAt");
  const [sortDir, setSortDir] = useState<SortDir>("desc");
  const [links, setLinks] = useState<Link[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [createUrl, setCreateUrl] = useState("");
  const [createCode, setCreateCode] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    getLinks({ limit: 100 })
      .then((res) => setLinks(res.links))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleCopy = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDir("desc");
    }
  };

  const handleCreate = async () => {
    if (!createUrl) return;
    setCreating(true);
    try {
      await createLink({
        originalUrl: createUrl,
        shortCode: createCode || undefined,
      });
      setCreateUrl("");
      setCreateCode("");
      setShowCreate(false);
      const res = await getLinks({ limit: 100 });
      setLinks(res.links);
    } catch {
      // silent
    } finally {
      setCreating(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this link?")) return;
    try {
      await deleteLink(id);
      setLinks((prev) => prev.filter((l) => l.id !== id));
    } catch {
      // silent
    }
  };

  const filtered = links
    .filter(
      (link) =>
        link.originalUrl.toLowerCase().includes(search.toLowerCase()) ||
        link.shortUrl.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      const mul = sortDir === "asc" ? 1 : -1;
      if (sortField === "clicks") return (a.clicks - b.clicks) * mul;
      return (
        (new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()) *
        mul
      );
    });

  const statusColor = (status: Link["status"]) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/10 text-emerald-500";
      case "expired":
        return "bg-amber-500/10 text-amber-500";
      case "disabled":
        return "bg-red-500/10 text-red-500";
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="w-6 h-6 border-2 border-brand/30 border-t-brand rounded-full animate-spin" />
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-6xl mx-auto"
      >
        {/* Page header */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8"
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight text-foreground">
              Links
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">
              Manage all your shortened URLs in one place.
            </p>
          </div>
          <button
            onClick={() => setShowCreate(!showCreate)}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-brand to-brand-dark px-4 text-sm font-medium text-white shadow-lg shadow-brand/20 hover:shadow-brand/30 transition-all duration-300 active:scale-[0.98] self-start"
          >
            <Plus className="w-4 h-4" />
            Create Link
          </button>
        </motion.div>

        {/* Create form */}
        {showCreate && (
          <motion.div
            variants={itemVariants}
            className="rounded-2xl bg-card border border-border/50 p-5 mb-6"
          >
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="url"
                placeholder="https://example.com/very-long-url"
                value={createUrl}
                onChange={(e) => setCreateUrl(e.target.value)}
                className="flex-1 h-10 px-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-brand/40 focus:shadow-glow-sm"
              />
              <input
                type="text"
                placeholder="Custom code (optional)"
                value={createCode}
                onChange={(e) => setCreateCode(e.target.value)}
                className="w-full sm:w-48 h-10 px-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-brand/40 focus:shadow-glow-sm"
              />
              <button
                onClick={handleCreate}
                disabled={creating || !createUrl}
                className="inline-flex h-10 items-center justify-center gap-1.5 rounded-xl bg-gradient-to-br from-brand to-brand-dark px-4 text-sm font-medium text-white shadow-lg shadow-brand/20 hover:shadow-brand/30 transition-all duration-300 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {creating ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Create"
                )}
              </button>
            </div>
          </motion.div>
        )}

        {/* Search */}
        <motion.div variants={itemVariants} className="relative mb-6">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-4 h-4 text-muted-foreground" />
          </div>
          <input
            type="text"
            placeholder="Search links..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full h-10 pl-10 pr-3 rounded-xl border border-border bg-background text-sm text-foreground placeholder:text-muted-foreground/50 outline-none transition-all duration-200 focus:border-brand/40 focus:shadow-glow-sm"
          />
        </motion.div>

        {/* Table */}
        <motion.div
          variants={itemVariants}
          className="rounded-2xl bg-card border border-border/50 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border/30 bg-muted/30">
                  <th className="text-left py-3.5 px-4 text-xs font-medium text-muted-foreground">
                    Short URL
                  </th>
                  <th className="text-left py-3.5 px-4 text-xs font-medium text-muted-foreground hidden md:table-cell">
                    Original URL
                  </th>
                  <th
                    className="text-right py-3.5 px-4 text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground select-none"
                    onClick={() => toggleSort("clicks")}
                  >
                    <span className="inline-flex items-center gap-1">
                      Clicks
                      <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th
                    className="text-right py-3.5 px-4 text-xs font-medium text-muted-foreground cursor-pointer hover:text-foreground select-none hidden sm:table-cell"
                    onClick={() => toggleSort("createdAt")}
                  >
                    <span className="inline-flex items-center gap-1">
                      Created
                      <ArrowUpDown className="w-3 h-3" />
                    </span>
                  </th>
                  <th className="text-center py-3.5 px-4 text-xs font-medium text-muted-foreground hidden sm:table-cell">
                    Status
                  </th>
                  <th className="text-right py-3.5 px-4 text-xs font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-12 text-center text-sm text-muted-foreground"
                    >
                      No links found.
                    </td>
                  </tr>
                ) : (
                  filtered.map((link) => (
                    <tr
                      key={link.id}
                      className="border-b border-border/20 last:border-0 hover:bg-muted/20 transition-colors"
                    >
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-1.5">
                          <span className="text-brand font-medium">
                            {link.shortUrl}
                          </span>
                          <button
                            onClick={() => handleCopy(link.shortUrl, link.id)}
                            className="w-6 h-6 flex items-center justify-center rounded hover:bg-muted transition-colors flex-shrink-0"
                          >
                            {copiedId === link.id ? (
                              <Check className="w-3 h-3 text-green-500" />
                            ) : (
                              <Copy className="w-3 h-3 text-muted-foreground" />
                            )}
                          </button>
                        </div>
                      </td>
                      <td className="py-3.5 px-4 text-muted-foreground truncate max-w-[250px] hidden md:table-cell">
                        {link.originalUrl}
                      </td>
                      <td className="py-3.5 px-4 text-right font-medium text-foreground">
                        {link.clicks.toLocaleString()}
                      </td>
                      <td className="py-3.5 px-4 text-right text-muted-foreground hidden sm:table-cell">
                        {new Date(link.createdAt).toLocaleDateString()}
                      </td>
                      <td className="py-3.5 px-4 text-center hidden sm:table-cell">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium ${statusColor(
                            link.status
                          )}`}
                        >
                          {link.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center justify-end gap-1">
                          <a
                            href={link.originalUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                          <button
                            onClick={() => handleDelete(link.id)}
                            className="w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-500/10 transition-colors text-muted-foreground hover:text-red-500"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </motion.div>
      </motion.div>
    </DashboardLayout>
  );
}