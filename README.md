# Karthikeya Veggalam: Personal Portfolio

Frontend: HTML, CSS, JavaScript. Backend: Node.js + Express. Database: MongoDB Atlas.

```
portfolio/
├── frontend/   index.html, style.css, script.js
└── backend/    server.js, seed.js, models/, package.json, .env.example
```

## Run locally

1. Create a free cluster at https://www.mongodb.com/atlas, add a database user, and allow your IP (or 0.0.0.0/0 for testing).
2. Backend:
   ```bash
   cd backend
   npm install
   cp .env.example .env      # then paste your MONGO_URI into .env
   npm run seed              # adds your projects and certifications to the database
   npm run dev               # API on http://localhost:5000
   ```
3. Frontend: open `frontend/` with VS Code "Live Server" (port 5500), or run `npx serve frontend`.

Set `CLIENT_ORIGIN` in `.env` to the URL your frontend runs on (for example `http://localhost:5500`).

## Add or edit projects and certifications

Edit the `projects` and `certifications` arrays in `backend/seed.js`, then run `npm run seed` again (it replaces all projects and certifications).

## Deploy

**Backend on Render**
1. Push the repo to GitHub.
2. Render > New > Web Service > pick the repo, root directory `backend`, build `npm install`, start `npm start`.
3. Add environment variables `MONGO_URI` and `CLIENT_ORIGIN` (your Netlify URL).
4. Copy the Render URL (for example `https://portfolio-api.onrender.com`).

**Frontend on Netlify**
1. In `frontend/script.js`, replace `https://YOUR-BACKEND.onrender.com` with your Render URL.
2. Netlify > Add new site > Import from GitHub, base directory `frontend`, no build command, publish directory `frontend`.
3. Add the Netlify URL to `CLIENT_ORIGIN` on Render and redeploy the backend.

Render's free tier sleeps when idle, so the first request can take about 30 seconds. Until the API wakes up, the site shows built-in fallback projects.

## Before you publish

- Check the About text and project descriptions, and add your real projects with GitHub and live links.
- Add a resume link to the hero or contact section if you have one.
