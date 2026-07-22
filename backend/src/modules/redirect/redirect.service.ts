import { findLinkByShortCode, incrementLinkClicks } from "@/repositories/link.repository";

export async function resolveShortCode(shortCode: string) {
  const link = await findLinkByShortCode(shortCode);
  if (!link || link.status !== "active") {
    return null;
  }
  await incrementLinkClicks(link.id);
  return link;
}