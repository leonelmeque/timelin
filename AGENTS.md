# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Timelin is a React Native (Expo SDK 51) todo app with timeline features. Firebase has been completely removed. The backend is now a REST API layer backed by a lightweight fetch interceptor (`src/mocks/mock-server.ts`) with in-memory storage (`src/mocks/db.ts`). This architecture is designed for easy Supabase integration.

### Architecture

- **API client**: `src/services/api-client.ts` — thin `fetch()` wrapper for REST calls. When switching to Supabase, replace these calls with Supabase SDK equivalents.
- **Auth state**: `src/services/auth-state.ts` — client-side auth state manager (replaces Firebase Auth's `onAuthStateChanged`). When switching to Supabase, replace with Supabase Auth session management.
- **API layer**: `src/lib/api/` — all business logic calls go through `fetch()` to REST endpoints (`/api/auth/*`, `/api/todos/*`, `/api/timelines/*`, `/api/users/*`, `/api/storage/*`).
- **Mock server**: `src/mocks/mock-server.ts` — patches `globalThis.fetch` to intercept `/api/*` requests and route them to handlers.
- **Mock handlers**: `src/mocks/handlers.ts` — route handlers organized by domain (auth, users, todos, timelines, storage).
- **Mock database**: `src/mocks/db.ts` — in-memory Maps that simulate a database. The data model maps to Supabase tables.

### Running the app (web)

Since there are no iOS/Android simulators in the cloud environment, run the app in web mode:

```
yarn web          # or: npx expo start --web --port 8081
```

The mock server starts automatically in development mode. To test: log in with any email/password (e.g. `test@example.com` / `password123`), then create a todo via the "+" button in the bottom tab bar.

### Linting

```
npx eslint --ext .ts,.tsx src/lib/utils/   # lint a subset (recommended)
```

ESLint 8 with `@typescript-eslint/parser` may crash with `AssertionError` on some files. Lint smaller subsets as a workaround.

### Testing

```
yarn tests        # runs Jest (4 passing suites, 1 skipped)
```

### Key caveats

- `@expo/metro-runtime` must be installed for Expo web support.
- The `tsconfig.json` is auto-modified by Expo to add `"extends": "expo/tsconfig.base"`.
- MSW (`msw/browser` and `msw/native`) cannot be bundled by Metro — this is why the project uses a custom lightweight fetch interceptor instead.
