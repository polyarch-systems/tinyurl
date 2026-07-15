import { Context } from "hono";
import { signup, signin } from "./auth.service";
import { signupSchema, signinSchema } from "@/validators/auth";

export async function signupHandler(c: Context) {
  try {
    const body = await c.req.json();
    const parsed = signupSchema.parse(body);
    const result = await signup(parsed);
    return c.json(result, 201);
  } catch (err: any) {
    if (err.name === "ZodError") {
      return c.json({ error: "Validation failed", details: err.errors }, 400);
    }
    return c.json({ error: err.message || "Signup failed" }, 400);
  }
}

export async function signinHandler(c: Context) {
  try {
    const body = await c.req.json();
    const parsed = signinSchema.parse(body);
    const result = await signin(parsed);
    return c.json(result, 200);
  } catch (err: any) {
    if (err.name === "ZodError") {
      return c.json({ error: "Validation failed", details: err.errors }, 401);
    }
    return c.json({ error: err.message || "Signin failed" }, 401);
  }
}
