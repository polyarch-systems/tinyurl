import { Context } from 'hono';
import { LinkStatus } from '@prisma/client';
import {
  createNewLink,
  getLink,
  getLinks,
  updateExistingLink,
  removeLink,
  resolveShortCode,
  getTopLinks,
} from './links.service';
import { createLinkSchema, updateLinkSchema } from '@/validators/link';

export async function createLinkHandler(c: Context) {
  try {
    const user = c.get('user');
    const body = await c.req.json();
    const parsed = createLinkSchema.parse(body);
    const shortCode = parsed.shortCode || Math.random().toString(36).substring(2, 10);
    const expiresAt = parsed.expiresAt ? new Date(parsed.expiresAt) : undefined;
    const link = await createNewLink(user.id, {
      originalUrl: parsed.originalUrl,
      shortCode,
      expiresAt,
    });
    return c.json({ ...link, shortUrl: `${process.env.BASE_URL}/r/${link.shortCode}` }, 201);
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return c.json({ error: 'Validation failed', details: err.errors }, 400);
    }
    return c.json({ error: err.message || 'Failed to create link' }, 400);
  }
}

export async function getLinksHandler(c: Context) {
  try {
    const user = c.get('user');
    const page = Number(c.req.query('page') || 1);
    const limit = Number(c.req.query('limit') || 20);
    const search = c.req.query('search') || undefined;
    const result = await getLinks(user.id, page, limit, search);
    return c.json(result);
  } catch (err: any) {
    return c.json({ error: err.message || 'Failed to fetch links' }, 400);
  }
}

export async function getLinkHandler(c: Context) {
  try {
    const user = c.get('user');
    const id = c.req.param('id')!;
    const link = await getLink(id, user.id);
    return c.json({ ...link, shortUrl: `${process.env.BASE_URL}/r/${link.shortCode}` });
  } catch (err: any) {
    return c.json({ error: err.message || 'Link not found' }, 404);
  }
}

export async function updateLinkHandler(c: Context) {
  try {
    const user = c.get('user');
    const id = c.req.param('id')!;
    const body = await c.req.json();
    const parsed = updateLinkSchema.parse(body);
    const data: {
      originalUrl?: string;
      status?: LinkStatus;
      expiresAt?: Date | null;
    } = {
      originalUrl: parsed.originalUrl,
      status: parsed.status,
      expiresAt:
        typeof parsed.expiresAt === 'string'
          ? new Date(parsed.expiresAt)
          : parsed.expiresAt === null
            ? null
            : undefined,
    };
    const link = await updateExistingLink(id, user.id, data);
    return c.json({ ...link, shortUrl: `${process.env.BASE_URL}/r/${link.shortCode}` });
  } catch (err: any) {
    if (err.name === 'ZodError') {
      return c.json({ error: 'Validation failed', details: err.errors }, 400);
    }
    return c.json({ error: err.message || 'Failed to update link' }, 400);
  }
}

export async function deleteLinkHandler(c: Context) {
  try {
    const user = c.get('user');
    const id = c.req.param('id')!;
    await removeLink(id, user.id);
    return c.json({ message: 'Link deleted' });
  } catch (err: any) {
    return c.json({ error: err.message || 'Failed to delete link' }, 400);
  }
}

export async function redirectHandler(c: Context) {
  const shortCode = c.req.param('shortCode')!;
  const link = await resolveShortCode(shortCode);
  if (!link) {
    return c.json({ error: 'Link not found' }, 404);
  }
  return c.redirect(link.originalUrl, 302);
}

export async function topLinksHandler(c: Context) {
  try {
    const user = c.get('user');
    const limit = Number(c.req.query('limit') || 5);
    const links = await getTopLinks(user.id, limit);
    return c.json(
      links.map((link) => ({ ...link, shortUrl: `${process.env.BASE_URL}/r/${link.shortCode}` }))
    );
  } catch (err: any) {
    return c.json({ error: err.message || 'Failed to fetch top links' }, 400);
  }
}
