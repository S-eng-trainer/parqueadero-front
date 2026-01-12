Netlify deployment notes

- The project uses Next.js. Netlify's official plugin `@netlify/plugin-nextjs` is configured in `netlify.toml` and `package.json`.

Quick deploy steps:

1. Install dependencies:

```bash
npm install
```

2. Push repository to GitHub and connect it to Netlify.

3. Ensure Netlify build command is set to `npm run netlify-build` and publish directory `out` (configured in `netlify.toml`).

Notes:

- The `netlify-build` script runs `next build` and attempts `next export`. If your app uses Server Components or API routes that require server runtime, consider using Netlify Edge Functions or an appropriate adapter. If using features that require a Node server, use Netlify's Next.js support (the plugin) which will build and route accordingly.
