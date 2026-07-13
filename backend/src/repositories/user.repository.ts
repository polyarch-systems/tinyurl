import bcrypt from "bcryptjs";
import prisma from "@/config/prisma";

export async function createUser(data: { email: string; name: string; passwordHash: string }) {
  return prisma.user.create({ data });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function updateUser(id: string, data: { name?: string; avatarUrl?: string }) {
  return prisma.user.update({ where: { id }, data });
}

export async function incrementLinksUsed(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { linksUsed: { increment: 1 } },
  });
}

export async function decrementLinksUsed(userId: string) {
  return prisma.user.update({
    where: { id: userId },
    data: { linksUsed: { decrement: 1 } },
  });
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}