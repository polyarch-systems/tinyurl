import { z } from "zod";

export const userResponseSchema = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string(),
  plan: z.string(),
  joinedAt: z.string(),
  teamMembers: z.number().int(),
  linksUsed: z.number().int(),
  linkLimit: z.number().int(),
});

export const authSignupResponseSchema = z.object({
  user: userResponseSchema,
  token: z.string(),
  refreshToken: z.string(),
});

export const authSigninResponseSchema = z.object({
  user: userResponseSchema,
  token: z.string(),
  refreshToken: z.string(),
});

export const linkResponseSchema = z.object({
  id: z.string(),
  originalUrl: z.string(),
  shortCode: z.string(),
  shortUrl: z.string(),
  status: z.string(),
  clicks: z.number().int(),
  expiresAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export const paginationSchema = z.object({
  links: z.array(linkResponseSchema),
  total: z.number().int(),
  page: z.number().int(),
  limit: z.number().int(),
  totalPages: z.number().int(),
});

export const errorResponseSchema = z.object({
  error: z.string(),
  details: z.any().optional(),
});

export const recentVisitorSchema = z.object({
  id: z.string(),
  linkId: z.string(),
  shortCode: z.string(),
  originalUrl: z.string(),
  referrer: z.string().nullable(),
  country: z.string().nullable(),
  city: z.string().nullable(),
  device: z.string().nullable(),
  browser: z.string().nullable(),
  os: z.string().nullable(),
  timestamp: z.string(),
});

export const visitPointSchema = z.object({
  date: z.string(),
  visits: z.number().int(),
});

export const ctrStatsSchema = z.object({
  totalClicks: z.number().int(),
  totalUniques: z.number().int(),
  ctr: z.number(),
});

export const topLinkAnalyticsSchema = z.object({
  id: z.string(),
  originalUrl: z.string(),
  shortCode: z.string(),
  clicks: z.number().int(),
});