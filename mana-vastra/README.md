# ಮನ ವಸ್ತ್ರ · Mana Vastra

A full-stack luxury saree catalog and inventory management system.

## Structure

```
mana-vastra/
├── backend/          # Express + SQLite REST API
├── website/          # Public-facing saree catalog (Vite + React)
└── admin-dashboard/  # Inventory management panel (Vite + React)
```

## Local Setup

### Backend
```bash
cd mana-vastra/backend
cp .env.example .env   # fill in your values
npm install
npm run dev            # runs on http://localhost:5001
```

### Website
```bash
cd mana-vastra/website
npm install
npm run dev            # runs on http://localhost:5174
```

### Admin Dashboard
```bash
cd mana-vastra/admin-dashboard
npm install
npm run dev            # runs on http://localhost:5173
```

## Environment Variables

### Backend (`backend/.env`)
| Variable | Description |
|---|---|
| `PORT` | Server port (default 5001) |
| `SQLITE_PATH` | Path to SQLite database file |
| `JWT_SECRET` | Secret key for JWT tokens |
| `JWT_EXPIRES_IN` | Token expiry (e.g. `7d`) |
| `CLIENT_URL` | Allowed CORS origin (your frontend URL) |
| `ADMIN_EMAIL` | Initial admin account email |
| `ADMIN_PASSWORD` | Initial admin account password |

### Website & Admin (`website/.env`, `admin-dashboard/.env`)
| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL (e.g. `http://localhost:5001/api`) |

## Deployment

- **Website** → Vercel
- **Admin Dashboard** → Vercel
- **Backend** → Railway (attach a Volume at `./data` for SQLite persistence)

Set `VITE_API_URL` in Vercel environment variables to your Railway backend URL.
