import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://astrodyuti.com',
  output: 'static',
  trailingSlash: 'never',
  build: { format: 'file' },
  server: { port: 4321 },
});
