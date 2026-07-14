import prisma from '@/config/prisma';
import { LinkStatus, Prisma } from '@prisma/client';

export async function createLink(data: {
  userId: string;
  originalUrl: string;
  shortCode: string;
  expiresAt?: Date;
}) {
  return prisma.link.create({ data });
}

export async function findLinkByShortCode(shortCode: string) {
  return prisma.link.findUnique({ where: { shortCode } });
}

export async function findLinkById(id: string) {
  return prisma.link.findUnique({ where: { id } });
}

export async function findLinksByUserId(userId: string, skip = 0, take = 20, search?: string) {
  const where: Prisma.LinkWhereInput = { userId };
  if (search) {
    where.OR = [{ originalUrl: { contains: search } }, { shortCode: { contains: search } }];
  }
  return prisma.link.findMany({ where, skip, take, orderBy: { createdAt: 'desc' } });
}

export async function countLinksByUserId(userId: string, search?: string): Promise<number> {
  const where: Prisma.LinkWhereInput = { userId };
  if (search) {
    where.OR = [{ originalUrl: { contains: search } }, { shortCode: { contains: search } }];
  }
  return prisma.link.count({ where });
}

export async function updateLink(
  id: string,
  data: { originalUrl?: string; status?: LinkStatus; expiresAt?: Date | null }
) {
  return prisma.link.update({ where: { id }, data });
}

export async function deleteLink(id: string) {
  return prisma.link.delete({ where: { id } });
}

export async function incrementLinkClicks(id: string) {
  return prisma.link.update({ where: { id }, data: { clicks: { increment: 1 } } });
}

export async function findTopLinksByUserId(userId: string, limit = 5) {
  return prisma.link.findMany({
    where: { userId },
    orderBy: { clicks: 'desc' },
    take: limit,
  });
}
