import { Hono } from "hono";
import { cors } from "hono/cors";
import { authRoutes } from "@/modules/auth/auth.routes";
import { linksRoutes } from "@/modules/links/links.routes";
import { analyticsRoutes } from "@/modules/analytics/analytics.routes";
import { redirectRoutes } from "@/modules/redirect/redirect.routes";
import { authMiddleware } from "@/middleware/auth";

const app = new Hono();

app.use("*", cors());

app.get("/health", (c) => c.json({ status: "ok" }));

app.route("/api/auth", authRoutes);

app.route("/api/links", linksRoutes);

app.use("/api/analytics", authMiddleware);
app.route("/api/analytics", analyticsRoutes);

app.route("/", redirectRoutes);

export default app;
