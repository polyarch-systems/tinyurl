import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import type { Handler } from "hono";
import {
  createLinkHandler,
  getLinksHandler,
  getLinkHandler,
  updateLinkHandler,
  deleteLinkHandler,
  redirectHandler,
  topLinksHandler,
} from "./links.controller";
import { createLinkSchema, updateLinkSchema } from "@/validators/link";
import {
  linkResponseSchema,
  paginationSchema,
  errorResponseSchema,
} from "@/openapi-responses";
import { z } from "zod";

export const linksRoutes = new OpenAPIHono();

const createLinkRoute = createRoute({
  method: "post",
  path: "/",
  summary: "Create a new short link",
  tags: ["Links"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: createLinkSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "Link created successfully",
      content: {
        "application/json": {
          schema: linkResponseSchema,
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

const getLinksRoute = createRoute({
  method: "get",
  path: "/",
  summary: "List all links for the authenticated user",
  tags: ["Links"],
  request: {
    query: z.object({
      page: z.string().optional(),
      limit: z.string().optional(),
      search: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: "Paginated list of links",
      content: {
        "application/json": {
          schema: paginationSchema,
        },
      },
    },
  },
});

const getLinkRoute = createRoute({
  method: "get",
  path: "/{id}",
  summary: "Get a single link by ID",
  tags: ["Links"],
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Link details",
      content: {
        "application/json": {
          schema: linkResponseSchema,
        },
      },
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

const updateLinkRoute = createRoute({
  method: "patch",
  path: "/{id}",
  summary: "Update a link by ID",
  tags: ["Links"],
  request: {
    params: z.object({
      id: z.string(),
    }),
    body: {
      content: {
        "application/json": {
          schema: updateLinkSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "Link updated successfully",
      content: {
        "application/json": {
          schema: linkResponseSchema,
        },
      },
    },
    400: {
      description: "Validation error",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

const deleteLinkRoute = createRoute({
  method: "delete",
  path: "/{id}",
  summary: "Delete a link by ID",
  tags: ["Links"],
  request: {
    params: z.object({
      id: z.string(),
    }),
  },
  responses: {
    200: {
      description: "Link deleted successfully",
      content: {
        "application/json": {
          schema: z.object({ message: z.string() }),
        },
      },
    },
    400: {
      description: "Error deleting link",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

const topLinksRoute = createRoute({
  method: "get",
  path: "/top",
  summary: "Get top links by click count",
  tags: ["Links"],
  request: {
    query: z.object({
      limit: z.string().optional(),
    }),
  },
  responses: {
    200: {
      description: "Top links",
      content: {
        "application/json": {
          schema: z.array(linkResponseSchema),
        },
      },
    },
  },
});

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

linksRoutes.openapi(createLinkRoute, createLinkHandler as Handler);
linksRoutes.openapi(getLinksRoute, getLinksHandler as Handler);
linksRoutes.openapi(topLinksRoute, topLinksHandler as Handler);
linksRoutes.openapi(getLinkRoute, getLinkHandler as Handler);
linksRoutes.openapi(updateLinkRoute, updateLinkHandler as Handler);
linksRoutes.openapi(deleteLinkRoute, deleteLinkHandler as Handler);
linksRoutes.openapi(redirectGetRoute, redirectHandler as Handler);
