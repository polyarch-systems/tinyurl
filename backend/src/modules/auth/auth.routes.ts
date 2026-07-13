import { Hono } from "hono";
import { signupHandler, signinHandler } from "./auth.controller";

export const authRoutes = new Hono();

authRoutes.post("/signup", signupHandler);
authRoutes.post("/signin", signinHandler);