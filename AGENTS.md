# AGENTS.md

## Product overview

Timelin is a React Native (Expo SDK 55) todo app with timeline features. The project is a **bun workspaces monorepo** with two apps:

- **`@timelin/mobile`** (`apps/mobile/`) — Expo React Native app (iOS, Android, web)
- **`@timelin/web`** (`apps/web/`) — Next.js 15 marketing website

## Monorepo structure

```
timelin/
├── package.json              ← root workspaces config
├── tsconfig.base.json        ← shared TypeScript base
├── release-please-config.json
├── .release-please-manifest.json
├── apps/
│   ├── mobile/               ← Expo app (@timelin/mobile)
│   └── web/                  ← Next.js site (@timelin/web)
```

Package manager: **bun** (not yarn, not npm). Always use `bun install`, `bun run`, etc.

## Commit conventions

This project uses [Conventional Commits](https://www.conventionalcommits.org/) and **release-please v4** to automate versioning. Each app is versioned independently — commit messages determine which app gets a version bump.

### Scoping rules

Use the `mobile` or `web` scope to target a specific app:

- `feat(mobile): add dark mode toggle` — bumps `@timelin/mobile` minor version
- `fix(web): correct hero image alignment` — bumps `@timelin/web` patch version
- `feat(mobile)!: redesign navigation` — bumps `@timelin/mobile` major version (breaking)

For changes that affect both apps or repo-level configs (CI, root tsconfig, eslint, etc.), omit the scope:

- `chore: update CI workflow`
- `build: upgrade bun to v1.2`

### Commit types and their effect on versioning

| Type | Version bump | Use for |
|------|-------------|---------|
| `feat` | minor | New features, new screens, new API endpoints |
| `fix` | patch | Bug fixes |
| `docs` | none | Documentation only |
| `chore` | none | Maintenance, dependency updates, CI changes |
| `build` | none | Build system, config changes |
| `refactor` | none | Code restructuring without behavior change |
| `test` | none | Adding or updating tests |
| `style` | none | Code style (formatting, semicolons, etc.) |
| `perf` | patch | Performance improvements |

### Important rules

1. **Always use conventional commit format**: `type(scope): description`
2. **Scope to the app** when the change is app-specific: `feat(mobile):`, `fix(web):`
3. **Breaking changes** use `!` after scope: `feat(mobile)!: ...` or include `BREAKING CHANGE:` in the commit body
4. **Keep the subject line under 72 characters**
5. **Do not manually edit version numbers** in `package.json` or `.release-please-manifest.json` — release-please handles this automatically
6. **Do not manually edit `CHANGELOG.md`** files — release-please generates these from commit messages

### How release-please works

- On every push to `main`, release-please reads new commits
- Commits touching `apps/mobile/` create/update a release PR for `@timelin/mobile`
- Commits touching `apps/web/` create/update a release PR for `@timelin/web`
- Merging a release PR publishes a GitHub release and updates the version + changelog
- Each app has its own `CHANGELOG.md` inside its directory

## Architecture (mobile app)

- **Routing**: Expo Router (file-based) — routes in `apps/mobile/app/`. Auth redirect in `app/_layout.tsx`. Tabs in `app/(tabs)/`.
- **Styling**: NativeWind v4 (Tailwind CSS) for new components + styled-components/native for legacy. Reusable UI primitives in `src/components/ui/`.
- **API client**: `src/services/api-client.ts` — thin `fetch()` wrapper for REST calls.
- **Auth state**: `src/services/auth-state.ts` — client-side auth state manager.
- **API layer**: `src/lib/api/` — business logic calls via `fetch()` to REST endpoints.
- **Mock server**: `src/mocks/mock-server.ts` — patches `globalThis.fetch` to intercept `/api/*` requests.
- **Mock database**: `src/mocks/db.ts` — in-memory Maps simulating a database.

## Architecture (web app)

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS v4
- **TypeScript**: Extends shared `tsconfig.base.json`

## Running the apps

```bash
# Install dependencies (from repo root)
bun install

# Mobile app
bun run mobile:start       # Expo dev server
bun run mobile:ios         # Run on iOS
bun run mobile:android     # Run on Android
bun run mobile:web         # Run in browser

# Web app
bun run web:dev            # Next.js dev server (localhost:3000)
bun run web:build          # Production build
```

## Testing strategy

This project uses a layered testing approach — each tool covers a distinct scope.

| Layer | Tool | Scope | Location |
|-------|------|-------|----------|
| **Unit tests** | Jest | Pure logic, utilities, hooks, stores, reducers — anything without UI | `apps/mobile/tests/` |
| **Component tests** | Storybook play functions | Interactive component behavior: user events, visual states, callback assertions | `apps/mobile/src/**/*.stories.tsx` |
| **Web E2E** | Playwright | Full user flows on Expo web: auth, navigation, routing, responsive layout | `apps/mobile/e2e/` |
| **Mobile E2E** | Maestro | Full user flows on iOS/Android: native gestures, device-specific behavior | `apps/mobile/.maestro/` |

### When to use what

- **Jest** — business logic, data transformations, custom hooks with `renderHook`, anything that doesn't need a visible UI. Do **not** write Jest tests for component interactions — use Storybook instead.
- **Storybook** — component rendering, `play` functions for simulating clicks/typing/assertions, visual debugging, `fn()` spies for callback props. Replaces Jest for all component-level interaction testing. Stories double as living documentation.
- **Playwright** — end-to-end flows that require the full Expo web app running (real routing, auth redirects, mock server, cross-screen navigation). Runs against `localhost:8081`.
- **Maestro** — end-to-end flows on real/simulated iOS and Android devices. Covers native-only behavior (gestures, push notifications, deep links, platform-specific UI) that Playwright cannot test.

### Running tests

```bash
# Unit tests (Jest)
bun run mobile:tests

# Component tests (Storybook)
cd apps/mobile && bun run storybook          # launch Storybook dev server
cd apps/mobile && bun run test-storybook     # run play functions headless

# Web E2E (Playwright) — requires Expo web server on port 8081
cd apps/mobile && npx playwright test

# Mobile E2E (Maestro) — requires running simulator/device
cd apps/mobile && maestro test .maestro/
```

## Key caveats

- `@expo/metro-runtime` must be installed for Expo web support.
- Metro config (`apps/mobile/metro.config.js`) includes monorepo node_modules resolution — don't remove `nodeModulesPaths` or `watchFolders`.
- The mobile `tsconfig.json` extends both `../../tsconfig.base.json` and `expo/tsconfig.base`.
