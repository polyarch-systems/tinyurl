import { OpenAPIHono, createRoute } from "@hono/zod-openapi";
import type { Handler } from "hono";
import { signupHandler, signinHandler } from "./auth.controller";
import { signupSchema, signinSchema } from "@/validators/auth";
import {
  authSignupResponseSchema,
  authSigninResponseSchema,
  errorResponseSchema,
} from "@/openapi-responses";

export const authRoutes = new OpenAPIHono();

const signupRoute = createRoute({
  method: "post",
  path: "/signup",
  summary: "Register a new user",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: signupSchema,
        },
      },
    },
  },
  responses: {
    201: {
      description: "User registered successfully",
      content: {
        "application/json": {
          schema: authSignupResponseSchema,
        },
      },
    },
    400: {
      description: "Validation error or user already exists",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

const signinRoute = createRoute({
  method: "post",
  path: "/signin",
  summary: "Sign in with email and password",
  tags: ["Auth"],
  request: {
    body: {
      content: {
        "application/json": {
          schema: signinSchema,
        },
      },
    },
  },
  responses: {
    200: {
      description: "User signed in successfully",
      content: {
        "application/json": {
          schema: authSigninResponseSchema,
        },
      },
    },
    401: {
      description: "Invalid credentials",
      content: {
        "application/json": {
          schema: errorResponseSchema,
        },
      },
    },
  },
});

authRoutes.openapi(signupRoute, signupHandler as Handler);
authRoutes.openapi(signinRoute, signinHandler as Handler);