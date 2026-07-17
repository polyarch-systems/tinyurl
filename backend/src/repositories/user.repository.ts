import prisma from "@/config/prisma";
import bcrypt from "bcryptjs";

export async function createUser(data: { email: string; name: string; passwordHash: string }) {
  return prisma.user.create({
    data: {
      email: data.email,
      name: data.name,
      passwordHash: data.passwordHash,
    },
  });
}

export async function findUserByEmail(email: string) {
  return prisma.user.findUnique({ where: { email } });
}

export async function findUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}

export async function updateUser(id: string, data: { name?: string; avatarUrl?: string }) {
  return prisma.user.update({
    where: { id },
    data: {
      ...(data.name !== undefined ? { name: data.name } : {}),
      ...(data.avatarUrl !== undefined ? { avatarUrl: data.avatarUrl } : {}),
    },
  });
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