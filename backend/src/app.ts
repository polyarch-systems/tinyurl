import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { apiReference } from "@scalar/hono-api-reference";
import { authRoutes } from "@/modules/auth/auth.routes";
import { linksRoutes } from "@/modules/links/links.routes";
import { analyticsRoutes } from "@/modules/analytics/analytics.routes";
import { redirectRoutes } from "@/modules/redirect/redirect.routes";
import { authMiddleware } from "@/middleware/auth";

const app = new OpenAPIHono();

app.use("*", cors());

app.get("/health", (c) => c.json({ status: "ok" }));

app.route("/api/auth", authRoutes);
app.route("/api/links", linksRoutes);

app.use("/api/analytics", authMiddleware);
app.route("/api/analytics", analyticsRoutes);

app.route("/", redirectRoutes);

app.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "TinyURL API",
    version: "1.0.0",
    description: "API for shortening URLs with analytics",
  },
  servers: [
    {
      url: "http://localhost:3001",
      description: "Local development server",
    },
  ],
});

app.get(
  "/docs",
  apiReference({
    spec: {
      url: "/openapi.json",
    },
  }),
);

export default app;