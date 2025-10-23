// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';
import nodeAdapter from '@astrojs/node';

export default defineConfig({
  output: 'server',         // importante para SSR
  adapter: nodeAdapter(),    // adapter Node
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
