# Tea-Factory
Tea factory management system is software that streamlines supplier, employee, inventory and production management.
It helps owners make informed decisions, increase efficiency, reduce costs, and maximize profits. A must-have for any tea factory.

## Run with Docker

Prerequisites: Docker Engine with Docker Compose v2.

```bash
docker compose up --build
docker compose run --rm seed   # load dummy data (required for a fresh database)
```

- Frontend (GUI): http://localhost:3000
- Backend API: http://localhost:5050/api/v1/tea-factory

Stack: `mongodb` (mongo:6, port 27017), `backend` (Express + Mongoose), `frontend` (nginx + built CRA app).

Notes:

- The backend's `CONNECTION_STRING` is overridden in `docker-compose.yml` to point at the bundled local MongoDB (`mongodb://mongodb:27017/Tea-Factory`). The committed Atlas credentials in `backend/.env` are **not** used by the Docker stack (that cluster no longer resolves). `ACCESS_TOKEN_SECRET` and `PORT` still come from `backend/.env`.
- The backend publishes to host port **5050** (not 5000) because macOS ControlCenter / AirPlay Receiver occupies port 5000 on this machine. The frontend nginx reaches the backend on port 5000 over the compose network, so the app works regardless. Change the mapping back to `"5000:5000"` once port 5000 is free. Some dashboard widgets hardcode `http://localhost:5000/...` and will show no data until then.
- API requests from the frontend are proxied through nginx: `/employees`, `/inventory`, `/payrolls`, `/productions`, `/supliers` → `http://backend:5000/api/v1/tea-factory/...`.
- `docker compose run --rm seed` is idempotent: it clears all collections and re-inserts dummy data. Re-run anytime to reset.

Stop with `docker compose down` (add `-v` to also delete the local MongoDB volume).

### Demo login

The seed creates one user per role. All passwords are `1234`:

| Name | Role |
| --- | --- |
| `Namal Perera` | HR Manager |
| `Kavinda Silva` | Inventory Manager |
| `Aruna Bandara` | Suplier Manager |
| `Tharindu Jayawardena` | Production Manager |

Login redirects by role, so the four names above land on the four different admin dashboards.

## Run locally (without Docker)

```bash
npm install
npm run dev
```

This starts the backend (nodemon, port 5000) and frontend (React dev server, port 3000) concurrently. Requires a reachable MongoDB — edit `CONNECTION_STRING` in `backend/.env` (the committed Atlas cluster no longer resolves).
