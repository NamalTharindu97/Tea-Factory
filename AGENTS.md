# AGENTS.md

## Overview
Monorepo: Express/Mongoose REST API (`backend/`, CommonJS) + Create-React-App frontend (`frontend/`). No lint or typecheck step exists; tests and `npm run build` are the only verification.

## Commands
- Root `npm run dev` — runs backend (nodemon) and frontend concurrently. Backend on :5000, frontend on :3000.
- Root `npm test` runs both suites (`npm --prefix backend test && npm --prefix frontend test`):
  - `cd backend && npm test` — uses an in-memory MongoDB (`mongodb-memory-server` via `backend/jest.config.js` + `backend/test/setup.js`); never touches a real DB. Includes `__test__/api.test.js` (supertest) which asserts the auth guard (401 without/with bad token) and the 404 handler.
  - `cd frontend && npm test` — standalone Jest (not `react-scripts test`), configured by `frontend/jest.config.js`.
- Docker: `docker compose up --build` then `docker compose run --rm seed` (seeds dummy data; idempotent). Frontend on :3000, backend published on host :5050 (host 5000 is held by macOS ControlCenter/AirPlay; nginx reaches the backend on :5000 over the compose network). Stack also includes a local `mongodb` (mongo:6) service; compose overrides `CONNECTION_STRING` to `mongodb://mongodb:27017/Tea-Factory`. Login users: `Namal Perera`/`Kavinda Silva`/`Aruna Bandara`/`Tharindu Jayawardena`, password `1234`.

## Env
- `backend/.env` is required to run the server and backend tests (`CONNECTION_STRING`, `ACCESS_TOKEN_SECRET`, `PORT=5000`). It is committed to git and holds live production Atlas credentials — never rotate, leak, or delete it.
- It must use `KEY=value` format (no spaces around `=`) because Docker Compose `env_file` and the container rely on it. It is excluded from the Docker image via `backend/.dockerignore`; compose injects it via `env_file`.
- The committed `CONNECTION_STRING` points to an Atlas cluster that no longer resolves (`querySrv ENOTFOUND` / NXDOMAIN). Docker Compose overrides it to the local `mongodb` service, so only non-Docker dev (`npm run dev`) needs a live DB. Backend tests run against an in-memory MongoDB. `backend/seed.js` is the canonical dummy-data loader (used by the compose `seed` service; run from host with `MONGODB_URI` override too).
- `backend/.env` is now optional for the Docker stack: `docker-compose.yml` declares it as `env_file` with `required: false` and provides `CONNECTION_STRING`, `PORT=5000` and a dev `ACCESS_TOKEN_SECRET` fallback so the stack runs without it. `backend/.env.example` documents the keys.

## Backend
- Entry: `backend/server.js`. Port comes from `.env` (5000); the 5001 fallback in code is not used in practice.
- Routes mount under `/api/v1/tea-factory/<resource>`: `employees`, `inventory`, `payrolls`, `productions`, `supliers` (note the "supliers" typo is the real route — files are `suplierRoutes.js`/`suplierController.js`).
- Per-resource pattern: `routes/*Routes.js` → `controllers/*Controller.js` → `models/*Model.js`. `constant.js` + `middleware/errorHandler.js` define status-code error responses.
- Auth is enforced via `router.use(validateToken)` in every `routes/*Routes.js` file (applied after the public `employees/login` route). `server.js` no longer mounts it globally; it also adds a 404 catch-all so unmatched paths return `404` instead of hanging, and `errorHandler.js` no longer leaks `stackTrace` to clients.
- All read/write endpoints require a valid Bearer token; JWT is signed with `ACCESS_TOKEN_SECRET` (180m expiry). Update handlers whitelist fields explicitly (no `req.body` mass assignment).
- `mongoose` is a proper `dependency` (was misdeclared in `devDependencies`).

## Frontend
- CRA (react-scripts 5). Dev proxy sends root-relative axios calls to `http://localhost:5000/api/v1/tea-factory` (e.g., `axios.get("/employees")`). In the Docker/nginx setup, nginx replicates this via prefix `location` blocks; there is no `baseURL` anywhere.
- `src/api/axios.js` (imported once from `src/index.js`) adds a request interceptor that attaches the JWT from `localStorage("accessToken")` to every call, and a response interceptor that logs the user out and redirects to `/` on any 401.
- Components use root-relative axios paths (no hardcoded `localhost:5000` URLs anymore).
- Routed pages in `src/pages/<domain>/`; shared UI in `src/components/<Domain>Co/`. Styling is co-located SCSS (`.scss`) or CSS.
- Only `@mui/material` v5 is used now (`@material-ui/core` v4 was removed).

## Frontend tests
- `frontend/jest.config.js` maps many imports to mocks in `src/__mocks__/` (`axios`, `react-router-dom`, `d3-ease`, `jsPDF`, `useState`, css/scss, png). If a new dependency breaks a jsdom test, add a mock there.
- Tests use Enzyme `shallow` with `@cfaester/enzyme-adapter-react-18` (see `src/__test__/NavBar.test.js`).

## Style & workflow
- Prettier `printWidth: 200` (`.prettierrc`) — keep long lines; don't reformat.
- Git history shows feature branches named `feature/<author>/<topic>` merged via PRs into `master`.
