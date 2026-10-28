---
name: Standalone npm lockfiles in a pnpm workspace
description: Prevent parent-workspace packages from leaking into a standalone app's npm lockfile.
---

When a package nested in this pnpm workspace must also work as an independent npm project, generate its `package-lock.json` from an isolated directory containing only the package manifest. An `npm install` run inside the workspace can record parent `node_modules/.pnpm` packages as extraneous, including packages the app does not use.

**Why:** The contaminated lockfile included unrelated workspace packages and advisories, so the app was not genuinely independent even though its own `package.json` was clean.

**How to apply:** Generate the lock from a clean temporary directory, put it beside the app's `package.json`, and confirm it contains no paths into parent `node_modules/.pnpm` or workspace-only packages. Then verify `npm ci` and the app's build from the app directory.
