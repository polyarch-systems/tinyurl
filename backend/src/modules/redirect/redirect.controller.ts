import { Context } from "hono";
import { resolveShortCode } from "@/modules/links/links.service";

export async function redirectHandler(c: Context) {
  const shortCode = c.req.param("shortCode")!;
  const link = await resolveShortCode(shortCode);
  if (!link) {
    return c.json({ error: "Link not found" }, 404);
  }
  return c.redirect(link.originalUrl, 302);
}