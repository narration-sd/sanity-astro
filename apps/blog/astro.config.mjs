import sanity from "@sanity/astro";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel/serverless";
import react from "@astrojs/react";
import { loadEnv } from 'vite'

const env = {
  ...process.env,
  ...loadEnv(process.env.NODE_ENV, process.cwd(), [
    'PUBLIC_SANITY_', // can add others
  ])}

console.log ('projectId: ' + env.PUBLIC_SANITY_PROJECT_ID)
console.log ('dataset: ' + env.PUBLIC_SANITY_DATASET)
console.log ('basepath: ' + env.PUBLIC_SANITY_STUDIO_CALL_PATH)
// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID,
      dataset: env.PUBLIC_SANITY_DATASET,
      apiVersion: '2024-05-05',
      useCdn: false,
      perspective: 'previewDrafts',
      token: env.PUBLIC_SANITY_VIEWER_TOKEN,
      stega: {
        enabled:true,
        studioUrl: env.PUBLIC_SANITY_STUDIO_PREVIEW_URL
            + env. PUBLIC_SANITY_STUDIO_CALL_PATH // '/admin',
      },
      studioBasePath: env.PUBLIC_SANITY_STUDIO_CALL_PATH,
    }),
    react(),
  ],
  output: "server",
  adapter: vercel({
    edgeMiddleware: true,
  }),
});
