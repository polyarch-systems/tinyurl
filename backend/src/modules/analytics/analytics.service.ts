import { findRecentClickEventsByUserId, findVisitsOverTime, findTopLinksByClicks, countClickEventsByUserId, countUniqueClickEventsByUserId, getDashboardStats } from "@/repositories/link.repository";

export async function getRecentVisitors(userId: string, limit = 10) {
  const events = await findRecentClickEventsByUserId(userId, limit);
  return events.map(event => ({
    country: event.country || "US",
    city: event.city || "Unknown",
    device: event.device || "Desktop",
    browser: event.browser || "Chrome",
    time: formatTimeAgo(event.createdAt),
    timestamp: event.createdAt.toISOString(),
  }));
}

export async function getVisitsOverTime(userId: string, days = 7) {
  const events = await findVisitsOverTime(userId, days);
  const grouped: Record<string, number> = {};
  for (const event of events) {
    const dateKey = formatDateKey(event.createdAt);
    grouped[dateKey] = (grouped[dateKey] || 0) + 1;
  }
  return Object.entries(grouped)
    .map(([date, visits]) => ({ date, visits }))
    .sort((a, b) => a.date.localeCompare(b.date));
}

export async function getCtrStats(userId: string) {
  const [totalClicks, totalUniques] = await Promise.all([
    countClickEventsByUserId(userId),
    countUniqueClickEventsByUserId(userId),
  ]);
  const ctr = totalClicks > 0 ? Math.round((totalUniques / totalClicks) * 100 * 10) / 10 : 0;
  return {
    totalClicks,
    totalUniques,
    ctr,
  };
}

export async function getTopLinks(userId: string, limit = 5) {
  const links = await findTopLinksByClicks(userId, limit);
  return links.map((link, index) => ({
    id: link.id,
    url: link.originalUrl.replace(/^https?:\/\//, ""),
    shortUrl: `/r/${link.shortCode}`,
    clicks: link.clicks,
    rank: index + 1,
  }));
}

export async function getDashboardStatsService(userId: string) {
  return getDashboardStats(userId);
}

function formatTimeAgo(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

function formatDateKey(date: Date): string {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${months[date.getMonth()]} ${date.getDate()}`;
}