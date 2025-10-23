// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import nodeAdapter from '@astrojs/node';

export default defineConfig({
  output: 'server',
  adapter: nodeAdapter({
    mode: 'standalone' // <- importante
  }),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
