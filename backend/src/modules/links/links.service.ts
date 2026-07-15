import type { LinkStatus } from "@/repositories/mock-data";
import {
  createLink,
  findLinkById,
  findLinksByUserId,
  countLinksByUserId,
  updateLink,
  deleteLink,
  incrementLinkClicks,
  findTopLinksByUserId,
  findLinkByShortCode,
  incrementLinksUsed,
  decrementLinksUsed,
} from "@/repositories/mock-data";

export async function createNewLink(userId: string, data: { originalUrl: string; shortCode: string; expiresAt?: Date }) {
  const link = await createLink({ ...data, userId });
  await incrementLinksUsed(userId);
  return link;
}

export async function getLink(id: string, userId: string) {
  const link = await findLinkById(id);
  if (!link || link.userId !== userId) {
    throw new Error("Link not found");
  }
  return link;
}

export async function getLinks(userId: string, page = 1, limit = 20, search?: string) {
  const skip = (page - 1) * limit;
  const [links, total] = await Promise.all([
    findLinksByUserId(userId, skip, limit, search),
    countLinksByUserId(userId, search),
  ]);
  return { links, total, page, limit, totalPages: Math.ceil(total / limit) };
}

export async function updateExistingLink(id: string, userId: string, data: { originalUrl?: string; status?: LinkStatus; expiresAt?: Date | null }) {
  const link = await findLinkById(id);
  if (!link || link.userId !== userId) {
    throw new Error("Link not found");
  }
  return updateLink(id, data);
}

export async function removeLink(id: string, userId: string) {
  const link = await findLinkById(id);
  if (!link || link.userId !== userId) {
    throw new Error("Link not found");
  }
  await deleteLink(id);
  await decrementLinksUsed(userId);
}

export async function resolveShortCode(shortCode: string) {
  const link = await findLinkByShortCode(shortCode);
  if (!link || link.status !== "active") {
    return null;
  }
  await incrementLinkClicks(link.id);
  return link;
}

export async function getTopLinks(userId: string, limit = 5) {
  debugger
  return findTopLinksByUserId(userId, limit);
}