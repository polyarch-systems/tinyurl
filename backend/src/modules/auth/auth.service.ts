import bcrypt from "bcryptjs";
import { env } from "@/config/env";
import { signToken } from "@/utils/jwt";
import { findUserByEmail, hashPassword, createUser } from "@/repositories/mock-data";

export async function signup(data: { email: string; name: string; password: string }) {
  const existing = await findUserByEmail(data.email);
  if (existing) {
    throw new Error("User already exists");
  }

  const passwordHash = await hashPassword(data.password);

  const user = await createUser({
    email: data.email,
    name: data.name,
    passwordHash,
  });

  const token = signToken({ userId: user.id, email: user.email }, env.jwtSecret, env.jwtExpiresIn);
  const refreshToken = signToken({ userId: user.id, email: user.email }, env.jwtSecret, env.jwtRefreshExpiresIn);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      plan: "Free",
      joinedAt: user.joinedAt.toISOString(),
      teamMembers: user.teamMembers,
      linksUsed: Number(user.linksUsed),
      linkLimit: Number(user.linkLimit),
    },
    token,
    refreshToken,
  };
}

export async function signin(data: { email: string; password: string }) {
  const user = await findUserByEmail(data.email);
  if (!user || !user.passwordHash) {
    throw new Error("Invalid credentials");
  }

  const valid = await bcrypt.compare(data.password, user.passwordHash);
  if (!valid) {
    throw new Error("Invalid credentials");
  }

  const token = signToken({ userId: user.id, email: user.email }, env.jwtSecret, env.jwtExpiresIn);
  const refreshToken = signToken({ userId: user.id, email: user.email }, env.jwtSecret, env.jwtRefreshExpiresIn);

  return {
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      plan: "Free",
      joinedAt: user.joinedAt.toISOString(),
      teamMembers: user.teamMembers,
      linksUsed: Number(user.linksUsed),
      linkLimit: Number(user.linkLimit),
    },
    token,
    refreshToken,
  };
}