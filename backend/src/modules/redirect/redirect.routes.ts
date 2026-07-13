import { Hono } from "hono";
import { redirectHandler } from "./redirect.controller";

export const redirectRoutes = new Hono();

redirectRoutes.get("/r/:shortCode", redirectHandler);