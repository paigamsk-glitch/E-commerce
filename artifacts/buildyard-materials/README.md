# Buildyard Materials

A responsive static storefront for a local construction materials supplier. The catalogue is searchable and filterable; product enquiries and quote requests open a prepared WhatsApp message. No orders or form submissions are sent to a backend.

## Run locally

```sh
npm ci
npm run dev
```

Create the production build with `npm run build`; preview it with `npm run preview`. Vite writes standard production assets to `dist/`.

## Editable storefront data

- `src/data/products.ts` holds categories, product specifications, demo prices, and self-contained SVG product art.
- `src/data/business.ts` holds the business contact information, WhatsApp number, Maps URL, and the shared WhatsApp link helper.

Replace all sample prices, contact details, and the example address/number before publishing. WhatsApp number must be country code plus digits, without a plus sign. The storefront uses local system fonts and self-contained product illustrations.

## Publish to GitHub

1. Create an empty GitHub repository.
2. From this folder, run:

   ```sh
   git init
   git branch -M main
   git add .
   git commit -m "Build Buildyard storefront"
   git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
   git push -u origin main
   ```

## Deploy on Vercel

1. Import the GitHub repository into Vercel.
2. If you pushed the full workspace, keep the project root at `.`. The root `vercel.json` installs this app with its npm lockfile, builds it, and serves `artifacts/buildyard-materials/dist` without installing the other workspace packages.
3. If you made the app folder its own GitHub repository, keep the project root at `.` and use Vercel's detected Vite settings, or set build command to `npm run build` and output directory to `dist`.
4. Deploy. No server, API, environment variables, or SPA rewrite configuration is required.
