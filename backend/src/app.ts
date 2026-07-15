import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { apiReference } from "@scalar/hono-api-reference";
import { authRoutes } from "@/modules/auth/auth.routes";
import { linksRoutes } from "@/modules/links/links.routes";
import { analyticsRoutes } from "@/modules/analytics/analytics.routes";
import { redirectRoutes } from "@/modules/redirect/redirect.routes";
import { authMiddleware } from "@/middleware/auth";

const api = new OpenAPIHono();

api.use("*", cors());

api.get("/health", (c) => c.json({ status: "ok" }));

api.route("/auth", authRoutes);
api.use("/links/*", authMiddleware);

api.route("/links", linksRoutes);

api.use("/analytics/*", authMiddleware);
api.route("/analytics", analyticsRoutes);

api.doc("/openapi.json", {
  openapi: "3.0.0",
  info: {
    title: "TinyURL API",
    version: "1.0.0",
    description: "API for shortening URLs with analytics",
  },
  servers: [
    {
      url: "http://localhost:3001/api",
      description: "Local development server",
    },
  ],
});

api.get(
  "/docs",
  apiReference({
    spec: {
      url: "/api/openapi.json",
    },
  }),
);

const app = new OpenAPIHono();

app.route("/api", api);
app.route("/", redirectRoutes);

export default app;