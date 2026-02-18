# Deployment Guide for Vercel

This project is configured to be deployed on [Vercel](https://vercel.com). The repository contains a hybrid setup with a Vite frontend and an Express backend adapted for Vercel Serverless Functions.

## 1. Prerequisites

- A [Vercel Account](https://vercel.com/signup).
- A [LiveKit Account](https://livekit.io/) for API keys (required for the voice demo).
- Code pushed to a Git repository (GitHub, GitLab, or Bitbucket).

## 2. Project Configuration

We have added the following files to support Vercel deployment:
- `api/index.ts`: The Serverless Function entry point bridging Vercel to your Express backend logic.
- `vercel.json`: Configuration logic to handle routing.

## 3. Deploy Steps

1.  **Import Project**: Log in to Vercel and click "Add New..." -> "Project". Select your Git repository.
2.  **Configure Build Settings**:
    *   **Framework Preset**: Select **Vite** (It might auto-detect "Other" or "Vite").
    *   **Build Command**: `npm run build` (Default)
    *   **Output Directory**: `dist/public` (IMPORTANT: Change this from `dist` if distinct)
    *   **Install Command**: `npm install` (Default)
3.  **Environment Variables**:
    You MUST add the following environment variables in the Vercel dashboard:
    *   `LIVEKIT_URL`: Your LiveKit WebSocket URL.
    *   `LIVEKIT_API_KEY`: Your LiveKit API Key.
    *   `LIVEKIT_API_SECRET`: Your LiveKit API Secret.

4.  **Deploy**: Click "Deploy".

## Notes

- **Data Persistence**: The current implementation handles "Contact Requests" using in-memory storage. On Vercel (Serverless), this data **will disappear** after the request finishes. For production use, you should connect a database (like PostgreSQL, Vercel Postgres, or Supabase) and update `server/storage.ts`.
- **WebSocket Limits**: Standard Vercel Serverless functions have limited support for long-running WebSocket connections. However, this application uses LiveKit for the actual media transport (which is external), so the Next.js/Vercel backend is only used for token generation via HTTP, which works perfectly.
