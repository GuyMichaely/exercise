# exercise

## Cloudflare hosting

Cloudflare Workers Builds deploys this repository automatically when `main` changes.
`wrangler.jsonc` defines the Worker and production routing. `npm ci && npm run deploy`
rebuilds and deploys manually using a Cloudflare login. Static files are copied by
`scripts/build.mjs`; generated output is kept in `dist/` and is not committed.

Automatic deployments run on pushes to `main`; Cloudflare executes the build
configured in `wrangler.jsonc` before publishing the static assets.

The app is served at `https://exercise.guymichaely.com/`. The main website
embeds it at `/exercise/` using `/frame.js`, so browser storage belongs to
the app subdomain. Existing apex-origin storage is not migrated.
