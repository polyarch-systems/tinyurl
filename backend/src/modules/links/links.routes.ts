import { Hono } from "hono";
import { createLinkHandler, getLinksHandler, getLinkHandler, updateLinkHandler, deleteLinkHandler, redirectHandler, topLinksHandler } from "./links.controller";

export const linksRoutes = new Hono();

linksRoutes.post("/", createLinkHandler);
linksRoutes.get("/", getLinksHandler);
linksRoutes.get("/:id", getLinkHandler);
linksRoutes.patch("/:id", updateLinkHandler);
linksRoutes.delete("/:id", deleteLinkHandler);
linksRoutes.get("/top", topLinksHandler);
linksRoutes.get("/r/:shortCode", redirectHandler);