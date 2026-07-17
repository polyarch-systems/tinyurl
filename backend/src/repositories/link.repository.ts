import prisma from "@/config/prisma";
import { LinkStatus } from "@prisma/client";

export type { LinkStatus };

export async function createLink(data: {
  userId: string;
  originalUrl: string;
  shortCode: string;
  expiresAt?: Date;
}) {
  return prisma.link.create({
    data: {
      userId: data.userId,
      originalUrl: data.originalUrl,
      shortCode: data.shortCode,
      expiresAt: data.expiresAt ?? null,
    },
  });
}

export async function findLinkByShortCode(shortCode: string) {
  return prisma.link.findUnique({ where: { shortCode } });
}

export async function findLinkById(id: string) {
  return prisma.link.findUnique({ where: { id } });
}

export async function findLinksByUserId(userId: string, skip = 0, take = 20, search?: string) {
  return prisma.link.findMany({
    where: {
      userId,
      ...(search
        ? {
            OR: [
              { originalUrl: { contains: search, mode: "insensitive" } },
              { shortCode: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: "desc" },
    skip,
    take,
  });
}

export async function countLinksByUserId(userId: string, search?: string): Promise<number> {
  return prisma.link.count({
    where: {
      userId,
      ...(search
        ? {
            OR: [
              { originalUrl: { contains: search, mode: "insensitive" } },
              { shortCode: { contains: search, mode: "insensitive" } },
            ],
          }
        : {}),
    },
  });
}

export async function updateLink(
  id: string,
  data: { originalUrl?: string; status?: LinkStatus; expiresAt?: Date | null }
) {
  return prisma.link.update({
    where: { id },
    data: {
      ...(data.originalUrl !== undefined ? { originalUrl: data.originalUrl } : {}),
      ...(data.status !== undefined ? { status: data.status } : {}),
      ...(data.expiresAt !== undefined ? { expiresAt: data.expiresAt } : {}),
    },
  });
}

export async function deleteLink(id: string) {
  return prisma.link.delete({ where: { id } });
}

export async function incrementLinkClicks(id: string) {
  return prisma.link.update({
    where: { id },
    data: { clicks: { increment: 1 } },
  });
}

export async function findTopLinksByUserId(userId: string, limit = 5) {
  return prisma.link.findMany({
    where: { userId },
    orderBy: { clicks: "desc" },
    take: limit,
  });
}

// Click event repository functions

export async function findRecentClickEventsByUserId(userId: string, limit = 10) {
  return prisma.clickEvent.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: limit,
  });
}

export async function findVisitsOverTime(userId: string, days = 7) {
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  return prisma.clickEvent.findMany({
    where: {
      userId,
      createdAt: { gte: startDate },
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function countClickEventsByUserId(userId: string): Promise<number> {
  return prisma.clickEvent.count({ where: { userId } });
}

export async function countUniqueClickEventsByUserId(userId: string): Promise<number> {
  const result = await prisma.clickEvent.groupBy({
    by: ["ipAddress"],
    where: {
      userId,
      ipAddress: { not: null },
    },
  });
  return result.length;
}

export async function findTopLinksByClicks(userId: string, limit = 5) {
  const links = await prisma.link.findMany({
    where: { userId },
    orderBy: { clicks: "desc" },
    take: limit,
    select: {
      id: true,
      originalUrl: true,
      shortCode: true,
      clicks: true,
    },
  });
  return links;
}

export async function getDashboardStats(userId: string) {
  const [linkAgg, clickAgg] = await Promise.all([
    prisma.link.aggregate({
      where: { userId },
      _count: true,
      _sum: { clicks: true },
    }),
    prisma.link.count({
      where: { userId, status: "active" },
    }),
  ]);

  const totalLinks = linkAgg._count;
  const activeLinks = clickAgg;
  const totalClicks = linkAgg._sum.clicks ?? 0;
  const averageClicksPerLink = totalLinks > 0
    ? Math.round((Number(totalClicks) / totalLinks) * 10) / 10
    : 0;

  return {
    totalLinks,
    activeLinks,
    totalClicks: Number(totalClicks),
    averageClicksPerLink,
  };
}
