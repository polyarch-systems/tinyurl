import bcrypt from "bcryptjs";
import { env } from "@/config/env";
import { signToken } from "@/utils/jwt";

// Mock in-memory user store
type MockUser = {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  joinedAt: Date;
  teamMembers: string[];
  linksUsed: bigint | number;
  linkLimit: bigint | number;
};

let mockUsers: MockUser[] = [
  {
    id: "user_1",
    email: "demo@tinyurl.com",
    name: "Demo User",
    passwordHash: bcrypt.hashSync("password123", 10),
    joinedAt: new Date("2025-01-01"),
    teamMembers: [],
    linksUsed: 0n,
    linkLimit: 999n,
  },
];

let nextId = 2;

export async function signup(data: { email: string; name: string; password: string }) {
  const existing = mockUsers.find((u) => u.email === data.email);
  if (existing) {
    throw new Error("User already exists");
  }

  const passwordHash = await bcrypt.hash(data.password, 10);

  const user: MockUser = {
    id: `user_${nextId++}`,
    email: data.email,
    name: data.name,
    passwordHash,
    joinedAt: new Date(),
    teamMembers: [],
    linksUsed: 0,
    linkLimit: 25,
  };

  mockUsers.push(user);

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
  const user = mockUsers.find((u) => u.email === data.email);
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