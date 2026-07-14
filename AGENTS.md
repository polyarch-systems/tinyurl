# AGENTS.md

## Repository

This repository is a monorepo.

Structure:

- frontend/ — Next.js application
- backend/ — Hono API

Read the entire repository before making changes to understand the existing architecture and API contracts.

---

## Scope

Unless explicitly instructed otherwise:

- You may read every file in the repository.
- Modify only the part of the project requested by the current task.
- Never make unrelated changes.

---

## Frontend

Stack:

- Next.js
- TypeScript
- Tailwind CSS
- shadcn/ui

---

## Backend

Stack:

- Hono
- TypeScript
- Prisma
- PostgreSQL
- Zod

---

## Architecture

Prefer:

- clean architecture
- modular design
- strong typing
- reusable components
- production-ready code

Avoid unnecessary abstractions.

---

## Git

After every logical implementation step:

```bash
git add .
git commit -m "<meaningful message>"
git push
```

Use Conventional Commits.

Prefer many small commits over one large commit.

Never leave uncommitted changes.

---

## Validation

Before every commit:

- build
- typecheck
- lint

Fix every error before continuing.

---

## Permissions

Do not ask for confirmation when:

- creating files
- editing files
- installing dependencies
- running npm commands
- generating Prisma Client
- creating migrations
- committing
- pushing

Ask for confirmation only before:

- force push
- deleting significant code
- dropping databases
- destructive migrations
- rewriting git history

---

## Decision Making

When multiple implementation options exist:

- choose the simplest production-ready solution
- avoid unnecessary dependencies
- follow existing project conventions
- prioritize maintainability and readability

---

## General

Finish the current task before starting another.

Keep commits atomic.

Do not leave TODOs unless explicitly requested.

Always maintain a production-quality codebase.