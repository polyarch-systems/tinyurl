import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import type { Handler } from "hono";
import { redirectHandler } from "./redirect.controller";
import { z } from "zod";
import { errorResponseSchema } from "@/openapi-responses";

export const redirectRoutes = new OpenAPIHono();

const redirectGetRoute = createRoute({
  method: "get",
  path: "/r/{shortCode}",
  summary: "Redirect to the original URL",
  tags: ["Redirect"],
  request: {
    params: z.object({
      shortCode: z.string(),
    }),
  },
  responses: {
    302: {
      description: "Redirect to original URL",
    },
    404: {
      description: "Link not found",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

redirectRoutes.openapi(redirectGetRoute, redirectHandler as Handler);