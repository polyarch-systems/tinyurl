import { Context, Next } from "hono";
import { env } from "@/config/env";
import prisma from "@/config/prisma";
import { verifyToken } from "@/utils/jwt";

export async function authMiddleware(c: Context, next: Next) {
  const header = c.req.header("Authorization");
  if (!header?.startsWith("Bearer ")) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const token = header.slice(7);
  try {
    const payload = verifyToken(token, env.jwtSecret);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, name: true, planId: true, linksUsed: true, linkLimit: true, teamMembers: true, joinedAt: true },
    });
    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }
    c.set("user", user);
    await next();
  } catch {
    return c.json({ error: "Unauthorized" }, 401);
  }
}