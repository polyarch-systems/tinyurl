import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import type { Handler } from "hono";
import {
  recentVisitorsHandler,
  visitsOverTimeHandler,
  ctrStatsHandler,
  topLinksHandler,
} from "./analytics.controller";
import { z } from "zod";
import {
  recentVisitorSchema,
  visitPointSchema,
  ctrStatsSchema,
  topLinkAnalyticsSchema,
  errorResponseSchema,
} from "@/openapi-responses";

export const analyticsRoutes = new OpenAPIHono();

const recentVisitorsRoute = createRoute({
  method: "get",
  path: "/recent-visitors",
  summary: "Get recent visitors for the authenticated user",
  tags: ["Analytics"],
  request: {
    query: z.object({
      limit: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: "Recent visitors list",
      content: {
        "application/json": {
          schema: z.array(recentVisitorSchema),
        },
      },
    },
    400: {
      description: "Error fetching visitors",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

const visitsOverTimeRoute = createRoute({
  method: "get",
  path: "/visits",
  summary: "Get visits over time",
  tags: ["Analytics"],
  request: {
    query: z.object({
      period: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: "Visit counts over time",
      content: {
        "application/json": {
          schema: z.array(visitPointSchema),
        },
      },
    },
    400: {
      description: "Error fetching visits",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

const ctrStatsRoute = createRoute({
  method: "get",
  path: "/ctr",
  summary: "Get CTR statistics",
  tags: ["Analytics"],
  responses: {
    200: {
      description: "CTR stats",
      content: {
        "application/json": {
          schema: ctrStatsSchema,
        },
      },
    },
    400: {
      description: "Error fetching stats",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

const topLinksAnalyticsRoute = createRoute({
  method: "get",
  path: "/top-links",
  summary: "Get top analytics links",
  tags: ["Analytics"],
  request: {
    query: z.object({
      limit: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: "Top analytics links",
      content: {
        "application/json": {
          schema: z.array(topLinkAnalyticsSchema),
        },
      },
    },
    400: {
      description: "Error fetching top links",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

analyticsRoutes.openapi(recentVisitorsRoute, recentVisitorsHandler as Handler);
analyticsRoutes.openapi(visitsOverTimeRoute, visitsOverTimeHandler as Handler);
analyticsRoutes.openapi(ctrStatsRoute, ctrStatsHandler as Handler);
analyticsRoutes.openapi(topLinksAnalyticsRoute, topLinksHandler as Handler);