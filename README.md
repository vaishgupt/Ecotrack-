# EcoTrack 🌱

A full-stack website to calculate personal carbon footprints. The project contains a React + Vite frontend and a Node.js + Express backend with MongoDB for persistence and JWT-based authentication.

---

## 🔧 Tech stack

- Frontend: React + Vite
- Backend: Node.js, Express
- Database: MongoDB (Mongoose)
- Auth: JSON Web Tokens (JWT)

---

## 🚀 Quick start

### Backend

1. cd `backend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in `backend/` with at least:
   ```env
   MONGO_URI=your_mongodb_connection_string
   secret=your_jwt_secret
   PORT=5000 # optional (server defaults to 5000)
   ```
4. Start the server:
   - Run once: `node server.js`
   - For development (auto-restart): `npx nodemon server.js`

The backend exposes auth endpoints and one protected endpoint for footprint calculation.

### Frontend

1. cd `frontend`
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start dev server:
   ```bash
   npm run dev
   ```

Open the app in your browser at the address shown by Vite (usually `http://localhost:5173`).

---

## 🧭 API (overview)

Base server: `http://localhost:5000`

- `POST /signup` — Create an account (body: `{ name, email, password }`)
- `POST /login` — Login (body: `{ email, password }`) -> returns JWT
- `GET /check` — Verify token (requires `Authorization: Bearer <token>` header)
- `POST /api/calculate` — Calculate footprint (protected; requires `Authorization: Bearer <token>`)

> See `backend/routes/` and `backend/controllers/` for implementation details.

---

## ℹ️ Notes & tips

- Server defaults to port `5000` (see `backend/server.js`).
- If you want to run frontend + backend concurrently, run the two start commands in separate terminals.

---

## 🧾 License

MIT (add license file if desired)

---

