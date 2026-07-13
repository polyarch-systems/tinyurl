import { Hono } from "hono";
import { recentVisitorsHandler, visitsOverTimeHandler, ctrStatsHandler, topLinksHandler } from "./analytics.controller";

export const analyticsRoutes = new Hono();

analyticsRoutes.get("/recent-visitors", recentVisitorsHandler);
analyticsRoutes.get("/visits", visitsOverTimeHandler);
analyticsRoutes.get("/ctr", ctrStatsHandler);
analyticsRoutes.get("/top-links", topLinksHandler);