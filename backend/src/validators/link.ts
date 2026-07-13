import { z } from "zod";

export const createLinkSchema = z.object({
  originalUrl: z.string().url("Invalid URL"),
  shortCode: z.string().min(3).max(20).regex(/^[a-zA-Z0-9_-]+$/, "Short code must be alphanumeric, dashes, or underscores").optional(),
  expiresAt: z.string().datetime().optional(),
});

export const updateLinkSchema = z.object({
  originalUrl: z.string().url("Invalid URL").optional(),
  status: z.enum(["active", "expired", "disabled"]).optional(),
  expiresAt: z.string().datetime().optional().nullable(),
});

export type CreateLinkInput = z.infer<typeof createLinkSchema>;
export type UpdateLinkInput = z.infer<typeof updateLinkSchema>;