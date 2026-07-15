import { LinkStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

export type { LinkStatus };

export interface Link {
  id: string;
  userId: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
  status: LinkStatus;
  createdAt: Date;
  updatedAt: Date;
  expiresAt: Date | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  passwordHash: string | null;
  avatarUrl: string | null;
  planId: string | null;
  linksUsed: number;
  linkLimit: number;
  teamMembers: number;
  joinedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Mock data storage
let links: Link[] = [
  {
    id: '1',
    userId: 'user-1',
    originalUrl: 'https://example.com/very-long-page-name-that-goes-on-and-on',
    shortCode: 'abc123',
    clicks: 1247,
    status: 'active',
    createdAt: new Date('2026-06-15T10:00:00Z'),
    updatedAt: new Date('2026-06-15T10:00:00Z'),
    expiresAt: null,
  },
  {
    id: '2',
    userId: 'user-1',
    originalUrl: 'https://docs.example.com/getting-started/installation',
    shortCode: 'def456',
    clicks: 892,
    status: 'active',
    createdAt: new Date('2026-06-18T10:00:00Z'),
    updatedAt: new Date('2026-06-18T10:00:00Z'),
    expiresAt: null,
  },
  {
    id: '3',
    userId: 'user-1',
    originalUrl: 'https://blog.example.com/posts/why-url-shortening-matters',
    shortCode: 'ghi789',
    clicks: 2103,
    status: 'active',
    createdAt: new Date('2026-06-20T10:00:00Z'),
    updatedAt: new Date('2026-06-20T10:00:00Z'),
    expiresAt: null,
  },
  {
    id: '4',
    userId: 'user-1',
    originalUrl: 'https://shop.example.com/products/limited-edition-item',
    shortCode: 'jkl012',
    clicks: 456,
    status: 'active',
    createdAt: new Date('2026-06-22T10:00:00Z'),
    updatedAt: new Date('2026-06-22T10:00:00Z'),
    expiresAt: null,
  },
  {
    id: '5',
    userId: 'user-1',
    originalUrl: 'https://landing.example.com/campaign/summer-2026',
    shortCode: 'mno345',
    clicks: 3102,
    status: 'active',
    createdAt: new Date('2026-06-25T10:00:00Z'),
    updatedAt: new Date('2026-06-25T10:00:00Z'),
    expiresAt: null,
  },
  {
    id: '6',
    userId: 'user-1',
    originalUrl: 'https://newsletter.example.com/edition/july-2026',
    shortCode: 'pqr678',
    clicks: 678,
    status: 'active',
    createdAt: new Date('2026-07-01T10:00:00Z'),
    updatedAt: new Date('2026-07-01T10:00:00Z'),
    expiresAt: null,
  },
  {
    id: '7',
    userId: 'user-1',
    originalUrl: 'https://old-campaign.example.com/spring-sale',
    shortCode: 'stu901',
    clicks: 12309,
    status: 'expired',
    createdAt: new Date('2026-03-10T10:00:00Z'),
    updatedAt: new Date('2026-03-10T10:00:00Z'),
    expiresAt: new Date('2026-04-10T10:00:00Z'),
  },
  {
    id: '8',
    userId: 'user-1',
    originalUrl: 'https://temporary.example.com/temp-link',
    shortCode: 'vwx234',
    clicks: 89,
    status: 'disabled',
    createdAt: new Date('2026-07-05T10:00:00Z'),
    updatedAt: new Date('2026-07-05T10:00:00Z'),
    expiresAt: null,
  },
];

let users: User[] = [
  {
    id: 'user-1',
    email: 'user@tinyurl.com',
    name: 'Test User',
    passwordHash: 'hashed-password',
    avatarUrl: null,
    planId: null,
    linksUsed: 8,
    linkLimit: 1000,
    teamMembers: 1,
    joinedAt: new Date('2026-01-01T10:00:00Z'),
    createdAt: new Date('2026-01-01T10:00:00Z'),
    updatedAt: new Date('2026-01-01T10:00:00Z'),
  },
];

// Helper to generate unique IDs
let idCounter = 9;
export function generateId(): string {
  return String(idCounter++);
}

// Link repository mock functions
export async function createLink(data: {
  userId: string;
  originalUrl: string;
  shortCode: string;
  expiresAt?: Date;
}) {
  const now = new Date();
  const link: Link = {
    id: generateId(),
    userId: data.userId,
    originalUrl: data.originalUrl,
    shortCode: data.shortCode,
    clicks: 0,
    status: 'active',
    createdAt: now,
    updatedAt: now,
    expiresAt: data.expiresAt || null,
  };
  links.push(link);
  return link;
}

export async function findLinkByShortCode(shortCode: string) {
  return links.find((link) => link.shortCode === shortCode) || null;
}

export async function findLinkById(id: string) {
  return links.find((link) => link.id === id) || null;
}

export async function findLinksByUserId(userId: string, skip = 0, take = 20, search?: string) {
  let filtered = links.filter((link) => link.userId === userId);

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (link) =>
        link.originalUrl.toLowerCase().includes(searchLower) ||
        link.shortCode.toLowerCase().includes(searchLower)
    );
  }

  // Sort by createdAt desc
  filtered.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

  return filtered.slice(skip, skip + take);
}

export async function countLinksByUserId(userId: string, search?: string): Promise<number> {
  let filtered = links.filter((link) => link.userId === userId);

  if (search) {
    const searchLower = search.toLowerCase();
    filtered = filtered.filter(
      (link) =>
        link.originalUrl.toLowerCase().includes(searchLower) ||
        link.shortCode.toLowerCase().includes(searchLower)
    );
  }

  return filtered.length;
}

export async function updateLink(
  id: string,
  data: { originalUrl?: string; status?: LinkStatus; expiresAt?: Date | null }
) {
  const link = links.find((l) => l.id === id);
  if (!link) {
    throw new Error('Link not found');
  }

  if (data.originalUrl !== undefined) {
    link.originalUrl = data.originalUrl;
  }
  if (data.status !== undefined) {
    link.status = data.status;
  }
  if (data.expiresAt !== undefined) {
    link.expiresAt = data.expiresAt;
  }

  link.updatedAt = new Date();
  return link;
}

export async function deleteLink(id: string) {
  const index = links.findIndex((link) => link.id === id);
  if (index === -1) {
    throw new Error('Link not found');
  }

  const deleted = links[index];
  links.splice(index, 1);
  return deleted;
}

export async function incrementLinkClicks(id: string) {
  const link = links.find((l) => l.id === id);
  if (!link) {
    throw new Error('Link not found');
  }

  link.clicks += 1;
  link.updatedAt = new Date();
  return link;
}

export async function findTopLinksByUserId(userId: string, limit = 5) {
  return links
    .filter((link) => link.userId === userId)
    .sort((a, b) => b.clicks - a.clicks)
    .slice(0, limit);
}

// User repository mock functions
export async function createUser(data: { email: string; name: string; passwordHash: string }) {
  const now = new Date();
  const user: User = {
    id: `user-${generateId()}`,
    email: data.email,
    name: data.name,
    passwordHash: data.passwordHash,
    avatarUrl: null,
    planId: null,
    linksUsed: 0,
    linkLimit: 1000,
    teamMembers: 1,
    joinedAt: now,
    createdAt: now,
    updatedAt: now,
  };
  users.push(user);
  return user;
}

export async function findUserByEmail(email: string) {
  return users.find((user) => user.email === email) || null;
}

export async function findUserById(id: string) {
  return users.find((user) => user.id === id) || null;
}

export async function updateUser(id: string, data: { name?: string; avatarUrl?: string }) {
  const user = users.find((u) => u.id === id);
  if (!user) return null;

  if (data.name !== undefined) {
    user.name = data.name;
  }
  if (data.avatarUrl !== undefined) {
    user.avatarUrl = data.avatarUrl;
  }

  user.updatedAt = new Date();
  return user;
}

export async function incrementLinksUsed(userId: string) {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  user.linksUsed += 1;
  user.updatedAt = new Date();
  return user;
}

export async function decrementLinksUsed(userId: string) {
  const user = users.find((u) => u.id === userId);
  if (!user) return null;

  user.linksUsed = Math.max(0, user.linksUsed - 1);
  user.updatedAt = new Date();
  return user;
}

// Password utility functions
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Utility functions for testing/resetting
export function resetMockData() {
  idCounter = 9;
  links = [
    {
      id: '1',
      userId: 'user-1',
      originalUrl: 'https://example.com/very-long-page-name-that-goes-on-and-on',
      shortCode: 'abc123',
      clicks: 1247,
      status: 'active',
      createdAt: new Date('2026-06-15T10:00:00Z'),
      updatedAt: new Date('2026-06-15T10:00:00Z'),
      expiresAt: null,
    },
    {
      id: '2',
      userId: 'user-1',
      originalUrl: 'https://docs.example.com/getting-started/installation',
      shortCode: 'def456',
      clicks: 892,
      status: 'active',
      createdAt: new Date('2026-06-18T10:00:00Z'),
      updatedAt: new Date('2026-06-18T10:00:00Z'),
      expiresAt: null,
    },
    {
      id: '3',
      userId: 'user-1',
      originalUrl: 'https://blog.example.com/posts/why-url-shortening-matters',
      shortCode: 'ghi789',
      clicks: 2103,
      status: 'active',
      createdAt: new Date('2026-06-20T10:00:00Z'),
      updatedAt: new Date('2026-06-20T10:00:00Z'),
      expiresAt: null,
    },
    {
      id: '4',
      userId: 'user-1',
      originalUrl: 'https://shop.example.com/products/limited-edition-item',
      shortCode: 'jkl012',
      clicks: 456,
      status: 'active',
      createdAt: new Date('2026-06-22T10:00:00Z'),
      updatedAt: new Date('2026-06-22T10:00:00Z'),
      expiresAt: null,
    },
    {
      id: '5',
      userId: 'user-1',
      originalUrl: 'https://landing.example.com/campaign/summer-2026',
      shortCode: 'mno345',
      clicks: 3102,
      status: 'active',
      createdAt: new Date('2026-06-25T10:00:00Z'),
      updatedAt: new Date('2026-06-25T10:00:00Z'),
      expiresAt: null,
    },
    {
      id: '6',
      userId: 'user-1',
      originalUrl: 'https://newsletter.example.com/edition/july-2026',
      shortCode: 'pqr678',
      clicks: 678,
      status: 'active',
      createdAt: new Date('2026-07-01T10:00:00Z'),
      updatedAt: new Date('2026-07-01T10:00:00Z'),
      expiresAt: null,
    },
    {
      id: '7',
      userId: 'user-1',
      originalUrl: 'https://old-campaign.example.com/spring-sale',
      shortCode: 'stu901',
      clicks: 12309,
      status: 'expired',
      createdAt: new Date('2026-03-10T10:00:00Z'),
      updatedAt: new Date('2026-03-10T10:00:00Z'),
      expiresAt: new Date('2026-04-10T10:00:00Z'),
    },
    {
      id: '8',
      userId: 'user-1',
      originalUrl: 'https://temporary.example.com/temp-link',
      shortCode: 'vwx234',
      clicks: 89,
      status: 'disabled',
      createdAt: new Date('2026-07-05T10:00:00Z'),
      updatedAt: new Date('2026-07-05T10:00:00Z'),
      expiresAt: null,
    },
  ];
  users = [
    {
      id: 'user-1',
      email: 'user@tinyurl.com',
      name: 'Test User',
      passwordHash: 'hashed-password',
      avatarUrl: null,
      planId: null,
      linksUsed: 8,
      linkLimit: 1000,
      teamMembers: 1,
      joinedAt: new Date('2026-01-01T10:00:00Z'),
      createdAt: new Date('2026-01-01T10:00:00Z'),
      updatedAt: new Date('2026-01-01T10:00:00Z'),
    },
  ];
}