# Backend AGENTS

## Scope

- Work only inside this folder.
- Read the repository when necessary.
- Never modify unrelated files.

## Stack

- Hono
- TypeScript
- Prisma
- PostgreSQL
- Zod

## Rules

- Reuse existing code.
- Reuse existing Zod schemas.
- Keep business logic unchanged unless requested.
- Prefer simple, production-ready solutions.
- No unnecessary abstractions.
- Keep code modular.

## Quality

Before finishing:

- build
- typecheck
- lint

Fix all errors.

## Git

After every logical step:

```bash
git add .
git commit -m "<meaningful conventional commit>"
git push
```

Use small commits.

## Permissions

Do not ask before:

- editing files
- creating files
- installing packages
- running npm
- generating Prisma Client
- creating Prisma migrations
- committing
- pushing

Ask only before destructive operations.