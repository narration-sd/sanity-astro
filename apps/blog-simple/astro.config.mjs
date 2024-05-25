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
// https://astro.build/config
export default defineConfig({
  integrations: [
    sanity({
      projectId: env.PUBLIC_SANITY_PROJECT_ID, //'rbnafvhk', // 'r1n8r7fu',
      // projectId: '''r1n8r7fu',
      // projectId: 'rbnafvhk', // "3do82whm",
      dataset: env.PUBLIC_SANITY_DATASET, // 'production', // "next",
      apiVersion: '2024-05-05',
      // If you are doing static builds you may want opt out of the CDN
      useCdn: false,
      perspective: 'previewDrafts',
      token: env.PUBLIC_SANITY_VIEWER_TOKEN, // 'skGD6GZVm9wJqXnxC8Zkolf4uo9EUTIrwJEq1KYVPtvoGyJn2DAGYe4kf3IWta3lC1oSXCduaOqETKz087WXqR9KGXZEDkzoj4dAGYynFXMoeTNR9macBmvdijDO8VM9xcqzbV4ZT0a0ObWs1ObE0hALMmnluXTZL9KabzzR9ay07eGkVrYK',
      stega: {
        enabled:true,
        studioUrl: env.PUBLIC_SANITY_STUDIO_PREVIEW_URL + '/admin',
      },
      studioBasePath: "/admin",
    }),
    react(),
  ],
  output: "server",
  adapter: vercel({
    edgeMiddleware: true,
  }),
});
