"use client";

import {
  signin as apiSignin,
  signup as apiSignup,
  storeAuth,
  clearAuth,
  getStoredUser,
  type User,
} from "@/lib/api";

export interface AuthSession {
  email: string;
  name: string;
  signedInAt: number;
}

export async function signIn(email: string, password: string): Promise<void> {
  const result = await apiSignin({ email, password });
  storeAuth(result.token, result.refreshToken, result.user);
}

export async function signUp(
  email: string,
  password: string,
  name: string
): Promise<void> {
  const result = await apiSignup({ email, password, name });
  storeAuth(result.token, result.refreshToken, result.user);
}

export function signOut(): void {
  clearAuth();
}

export function getSession(): AuthSession | null {
  const user = getStoredUser();
  if (!user) return null;
  return {
    email: user.email,
    name: user.name,
    signedInAt: Date.now(),
  };
}

export function isAuthenticated(): boolean {
  return getStoredUser() !== null;
}

export function getUser(): User | null {
  return getStoredUser();
}