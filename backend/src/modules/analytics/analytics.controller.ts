import { Context } from "hono";
import { getRecentVisitors, getVisitsOverTime, getCtrStats, getTopLinks } from "./analytics.service";

export async function recentVisitorsHandler(c: Context) {
  try {
    const user = c.get("user");
    const limit = Number(c.req.query("limit") || 10);
    const visitors = await getRecentVisitors(user.id, limit);
    return c.json(visitors);
  } catch (err: any) {
    return c.json({ error: err.message || "Failed to fetch visitors" }, 400);
  }
}

export async function visitsOverTimeHandler(c: Context) {
  try {
    const user = c.get("user");
    const days = Number(c.req.query("period") || 7);
    const visits = await getVisitsOverTime(user.id, days);
    return c.json(visits);
  } catch (err: any) {
    return c.json({ error: err.message || "Failed to fetch visits" }, 400);
  }
}

export async function ctrStatsHandler(c: Context) {
  try {
    const user = c.get("user");
    const stats = await getCtrStats(user.id);
    return c.json(stats);
  } catch (err: any) {
    return c.json({ error: err.message || "Failed to fetch stats" }, 400);
  }
}

export async function topLinksHandler(c: Context) {
  try {
    const user = c.get("user");
    const limit = Number(c.req.query("limit") || 5);
    const links = await getTopLinks(user.id, limit);
    debugger
    return c.json(links);
  } catch (err: any) {
    return c.json({ error: err.message || "Failed to fetch top links" }, 400);
  }
}