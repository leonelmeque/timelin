# AGENTS.md

## Cursor Cloud specific instructions

### Product overview

Timelin is a React Native (Expo SDK 51) todo app with timeline features. Backend is Firebase (Auth, Firestore, Storage). See `README.md` for context.

### Running the app (web)

Since there are no iOS/Android simulators in the cloud environment, run the app in web mode:

```
yarn web          # or: npx expo start --web --port 8081
```

Firebase is mocked at the module level via `src/mocks/firebase/`. Metro's `resolveRequest` in `metro.config.js` redirects all `@react-native-firebase/*` imports to these mocks. The mocks use a shared in-memory store (`src/mocks/firebase/store.ts`) so auth and Firestore stay in sync. MSW is installed (`msw` package) and wired in `index.tsx` but currently fails to start on Metro-bundled web due to module resolution; the app still works without it because Firebase is mocked at the module level.

To test the app: log in with any email/password (e.g. `test@example.com` / `password123`), then create a todo via the "+" button in the bottom tab bar.

### Linting

```
npx eslint --ext .ts,.tsx src/lib/utils/   # lint a subset
npx eslint --ext .ts,.tsx src/             # lint all (may crash on some files due to ESLint 8 + TS parser bug)
```

Pre-existing lint errors exist in the repo; they are not caused by the mock setup.

### Testing

```
yarn tests        # runs Jest (4 passing suites, 1 skipped)
```

### Key caveats

- `@expo/metro-runtime` must be installed for web support (added via `npx expo install @expo/metro-runtime`).
- The `tsconfig.json` is auto-modified by Expo on first web start to add `"extends": "expo/tsconfig.base"`.
- The bottom tab bar icons on web may render very small; they are still clickable.
- ESLint 8 with `@typescript-eslint/parser` may crash with `AssertionError` on certain files; this is a known upstream bug. Lint smaller subsets of `src/` as a workaround.
