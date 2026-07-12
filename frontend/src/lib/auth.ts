"use client";

const AUTH_KEY = "tinyurl_auth";

export interface AuthSession {
  email: string;
  name: string;
  signedInAt: number;
}

export function signIn(email: string): void {
  const session: AuthSession = {
    email,
    name: email.split("@")[0],
    signedInAt: Date.now(),
  };
  localStorage.setItem(AUTH_KEY, JSON.stringify(session));
}

export function signOut(): void {
  localStorage.removeItem(AUTH_KEY);
}

export function getSession(): AuthSession | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(AUTH_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    return null;
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}