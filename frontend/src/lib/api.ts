const API_BASE = "http://localhost:3001";

// ── Shared Types ────────────────────────────────────────────────────────────

export interface User {
  id: string;
  email: string;
  name: string;
  plan: string;
  joinedAt: string;
  teamMembers: number;
  linksUsed: number;
  linkLimit: number;
}

export interface Link {
  id: string;
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  status: "active" | "expired" | "disabled";
  clicks: number;
  expiresAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedLinks {
  links: Link[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface RecentVisitor {
  id: string;
  linkId: string;
  shortCode: string;
  originalUrl: string;
  referrer: string | null;
  country: string | null;
  city: string | null;
  device: string | null;
  browser: string | null;
  os: string | null;
  timestamp: string;
}

export interface VisitPoint {
  date: string;
  visits: number;
}

export type CtrStats = {
  totalClicks: number;
  totalUniques: number;
  ctr: number;
};

export interface DashboardStats {
  totalLinks: number;
  activeLinks: number;
  totalClicks: number;
  averageClicksPerLink: number;
}

export interface TopLinkAnalytics {
  id: string;
  originalUrl: string;
  shortCode: string;
  clicks: number;
}

export interface ApiError {
  error: string;
  details?: unknown;
}

// ── Token Helpers ───────────────────────────────────────────────────────────

const TOKEN_KEY = "tinyurl_token";
const REFRESH_TOKEN_KEY = "tinyurl_refresh_token";
const USER_KEY = "tinyurl_user";

export function storeAuth(token: string, refreshToken: string, user: User) {
  localStorage.setItem(TOKEN_KEY, token);
  localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
  localStorage.setItem(USER_KEY, JSON.stringify(user));
}

export function clearAuth() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
  localStorage.removeItem(USER_KEY);
}

export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(TOKEN_KEY);
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(USER_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as User;
  } catch {
    return null;
  }
}

// ── HTTP Client ─────────────────────────────────────────────────────────────

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${path}`, {
    ...options,
    headers,
  });

  if (res.status === 401) {
    clearAuth();
    if (typeof window !== "undefined") {
      window.location.href = "/signin";
    }
    throw new ApiErrorImpl("Unauthorized", 401);
  }

  if (!res.ok) {
    const body = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new ApiErrorImpl(body.error || "Request failed", res.status, body.details);
  }

  // 204 No Content
  if (res.status === 204) {
    return undefined as T;
  }

  return res.json();
}

class ApiErrorImpl extends Error {
  status: number;
  details: unknown;
  constructor(message: string, status: number, details?: unknown) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

// ── Auth ────────────────────────────────────────────────────────────────────

interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export async function signup(data: {
  email: string;
  password: string;
  name: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/signup", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function signin(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  return request<AuthResponse>("/api/auth/signin", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

// ── Links ───────────────────────────────────────────────────────────────────

export async function createLink(data: {
  originalUrl: string;
  shortCode?: string;
  expiresAt?: string;
}): Promise<Link> {
  return request<Link>("/api/links/", {
    method: "POST",
    body: JSON.stringify(data),
  });
}

export async function getLinks(params?: {
  page?: number;
  limit?: number;
  search?: string;
}): Promise<PaginatedLinks> {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  if (params?.search) searchParams.set("search", params.search);
  const qs = searchParams.toString();
  return request<PaginatedLinks>(`/api/links${qs ? `?${qs}` : ""}`);
}

export async function getLink(id: string): Promise<Link> {
  return request<Link>(`/api/links/${id}`);
}

export async function updateLink(
  id: string,
  data: {
    originalUrl?: string;
    status?: "active" | "expired" | "disabled";
    expiresAt?: string | null;
  }
): Promise<Link> {
  return request<Link>(`/api/links/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });
}

export async function deleteLink(id: string): Promise<{ message: string }> {
  return request<{ message: string }>(`/api/links/${id}`, {
    method: "DELETE",
  });
}

export async function getTopLinks(limit?: number): Promise<Link[]> {
  const qs = limit ? `?limit=${limit}` : "";
  return request<Link[]>(`/api/links/top${qs}`);
}

// ── Analytics ───────────────────────────────────────────────────────────────

export async function getDashboardStats(): Promise<DashboardStats> {
  return request<DashboardStats>("/api/analytics/dashboard");
}

export async function getRecentVisitors(
  limit?: number
): Promise<RecentVisitor[]> {
  const qs = limit ? `?limit=${limit}` : "";
  return request<RecentVisitor[]>(`/api/analytics/recent-visitors${qs}`);
}

export async function getVisitsOverTime(
  period?: string
): Promise<VisitPoint[]> {
  const qs = period ? `?period=${period}` : "";
  return request<VisitPoint[]>(`/api/analytics/visits${qs}`);
}

export async function getCtrStats(): Promise<CtrStats> {
  return request<CtrStats>("/api/analytics/ctr");
}

export async function getTopAnalyticsLinks(
  limit?: number
): Promise<TopLinkAnalytics[]> {
  const qs = limit ? `?limit=${limit}` : "";
  return request<TopLinkAnalytics[]>(`/api/analytics/top-links${qs}`);
}

// ── Redirect ────────────────────────────────────────────────────────────────

export function getRedirectUrl(shortCode: string): string {
  return `${API_BASE}/r/${shortCode}`;
}