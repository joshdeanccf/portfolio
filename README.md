# Motion Portfolio — MERN Starter

An original portfolio inspired by the user's video reference: oversized outlined name, monochrome editorial design, motion transitions, dark experience timeline, and creative project previews.

## Requirements

- Node.js 20+ (Node.js 22 works)
- MongoDB running locally, or a MongoDB Atlas connection string

## First-time setup (PowerShell / VS Code)

Open this folder in VS Code and run:

```powershell
npm install
npm run install:all
Copy-Item server/.env.example server/.env
npm run dev
```

Visit **http://localhost:5173**. Backend health: **http://localhost:5000/api/health**.

If using Atlas, edit `server/.env` and replace `MONGODB_URI`. Do not commit `.env` to Git.

### Personalize

- `client/src/App.jsx`: change the `profile` object at the top (name, job title, email, bio, socials), plus `experience`, `skills`, and demo projects.
- `client/src/styles.css`: customize colors, fonts, layout, animation.
- The hero portrait is a typographic placeholder. Replace `.portrait-graphic` with your own image or component.
- `client/src/App.jsx` has local fallback demo projects so the design works even before MongoDB is connected.
- To insert demo projects into MongoDB, run `npm run seed --prefix server` (only seeds if no projects exist).
- To add real projects, edit the database using MongoDB Compass or write your own authenticated admin interface. No public write-project endpoint is exposed.
- The contact form sends POST `/api/contact` and saves to MongoDB. It does **not** send email notifications.

### Security and deployment

- Rate-limited contact endpoint and basic validation included; add CAPTCHA or spam protection before public production deployment.
- Keep production MongoDB credentials in Vercel Environment Variables; keep local credentials in the ignored `server/.env` file.
- Deploy the frontend and API together on Vercel, with MongoDB Atlas as the database:
	1. Push this repository to GitHub and create an Atlas database and database user. Copy the Atlas connection string, replacing its password placeholder. Configure Atlas Network Access for Vercel's outbound connections; use a fixed egress IP when available, otherwise allow `0.0.0.0/0` only with a strong database password and least-privilege database user.
	2. In Vercel, import the repository and leave Root Directory at the repository root. The root `vercel.json` installs the client and server dependencies, builds `client/dist`, and serves the Express API from `api/[...path].js`.
	3. In Vercel Project Settings → Environment Variables, add `MONGODB_URI` with the Atlas connection string for Production (and Preview if you plan to use preview deployments). Do not use the local `127.0.0.1` value in Vercel.
	4. Deploy. The frontend calls `/api/projects` and `/api/contact` on the same Vercel origin, so leave `VITE_API_URL` unset. `CLIENT_ORIGIN` is only needed if the API is called from a different origin.
	5. Confirm `https://your-project.vercel.app/api/health` reports `"database":"connected"`, then test project loading and submit a short contact message.
- For local development, `server/.env` can keep `mongodb://127.0.0.1:27017/my_portfolio`; Vite proxies `/api` to the local Express server.
- Contact messages are stored in the Atlas `Message` collection. The form does not send email notifications, so check the collection in MongoDB Atlas/Compass unless email delivery is added separately.
- All project content is sample content, not real credentials or claims.

## Troubleshooting

If `vite is not recognized` or `Cannot find package dotenv`, run `npm run install:all` from the root. Root `npm install` alone does not install subfolder dependencies.
