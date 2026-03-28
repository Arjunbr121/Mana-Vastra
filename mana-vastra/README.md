# Mana Vastra

Full stack luxury saree inventory system:

- `backend/`: Express + SQLite + Cloudinary API
- `frontend/`: Vite + React dashboard with Tailwind styling

## Local setup

1. Copy `backend/.env.example` to `backend/.env`
2. Copy `frontend/.env.example` to `frontend/.env`
3. Local SQLite is preconfigured in `backend/.env`
4. Add Cloudinary keys to `backend/.env` if you want image uploads
5. Install dependencies in both apps
6. Start backend on `http://localhost:5001`
7. Start frontend on `http://localhost:5173`

## Seeded login

- Email: `admin@manavastra.com`
- Password: `admin123`

The admin user is created automatically on first backend startup.
