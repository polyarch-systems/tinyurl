import prisma from "@/config/prisma";

export async function createClickEvent(data: {
  linkId: string;
  userId: string;
  country?: string;
  city?: string;
  device?: string;
  browser?: string;
  referrer?: string;
  ipAddress?: string;
}) {
  return prisma.clickEvent.create({ data });
}

export async function findClickEventsByUserId(userId: string, skip = 0, take = 20) {
  return prisma.clickEvent.findMany({
    where: { userId },
    skip,
    take,
    orderBy: { createdAt: "desc" },
  });
}

export async function countClickEventsByUserId(userId: string): Promise<number> {
  return prisma.clickEvent.count({ where: { userId } });
}

export async function findRecentClickEventsByUserId(userId: string, limit = 10) {
  return prisma.clickEvent.findMany({
    where: { userId },
    take: limit,
    orderBy: { createdAt: "desc" },
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
    select: {
      createdAt: true,
    },
    orderBy: { createdAt: "asc" },
  });
}

export async function findTopLinksByClicks(userId: string, limit = 5) {
  return prisma.link.findMany({
    where: { userId },
    select: {
      id: true,
      originalUrl: true,
      shortCode: true,
      clicks: true,
    },
    orderBy: { clicks: "desc" },
    take: limit,
  });
}