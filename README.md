# Government Project Monitoring Dashboard — Next.js

This is the Next.js conversion of the supplied Figma Make / React dashboard. The existing dashboard UI, custom styling, icons, navigation views, project list, analytics, public dashboard, and project detail drawer have been retained. The current project uses sample/static data; no backend or authentication service was included in the source archive.

## Requirements
- Node.js 20.9 or newer
- npm

## Run locally
```bash
npm install
npm run dev
```
Open http://localhost:3000.

## Production build and local production test
```bash
npm run build
npm run start
```
Open http://localhost:3000 after the build completes.

## Deploy to Vercel
1. Extract this ZIP and push the project folder to a GitHub repository.
2. In Vercel, select **Add New → Project** and import the repository.
3. Keep Framework Preset as **Next.js**. Build command: `npm run build`; install command: `npm install`; output directory: leave the default.
4. Select **Deploy**. No environment variables are required for the current static/sample-data dashboard.
5. For future API/backend integration, add the required environment variables in Vercel Project Settings → Environment Variables and redeploy.

You can also deploy using the Vercel CLI:
```bash
npm install -g vercel
vercel
vercel --prod
```

## Notes
- Main UI: `src/app/page.tsx`
- Styling: `src/app/globals.css`
- Page metadata and favicon: `src/app/layout.tsx`, `public/favicon.svg`
- This is a UI conversion, not a backend implementation. Data, account/profile details, and dashboard metrics in the supplied source are demo/static values.
