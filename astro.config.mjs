import { defineConfig } from 'astro/config';

// The active site. Each site ships its own asset tree under public/<slug>/,
// so dist/ only ever contains the assets of the site being built — which is
// what makes `aws s3 sync dist/ … --delete` safe on deploy.
const site = process.env.SITE || 'heartwell';

export default defineConfig({
  publicDir: `./public/${site}`,
  build: { format: 'file' },   // /locations/allen-view.html, not /locations/allen-view/index.html
  trailingSlash: 'never',
});
