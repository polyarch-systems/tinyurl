import { Context, Next } from "hono";
import { env } from "@/config/env";
import { verifyToken } from "@/utils/jwt";
import { findUserById } from "@/repositories/mock-data";

export async function authMiddleware(c: Context, next: Next) {
  const header = c.req.header("Authorization");
  if (!header?.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = header.slice(7);
  try {
    const payload = verifyToken(token, env.jwtSecret);
    const user = await findUserById(payload.userId);
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    c.set("user", user);
    await next();
  } catch {
    return c.json({ error: "Unauthorized" }, 401);
  }
}