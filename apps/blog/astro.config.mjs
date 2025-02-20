import sanityIntegration from "@sanity/astro";
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import { loadEnv } from 'vite';
import cloudflare from "@astrojs/cloudflare";

const env = {
  ...process.env,
  ...loadEnv(process.env.NODE_ENV, process.cwd(), [
    'PUBLIC_SANITY_', // can add others
])}

// 'sanity' check...
if (!(env.PUBLIC_SANITY_PROJECT_ID && env.PUBLIC_SANITY_DATASET
  && env.PUBLIC_SANITY_VIEWER_TOKEN && env.PUBLIC_SANITY_API_VERSION)) {
  throw new Error ('You have to fill in all your /.env environmental variables, ' +
      'from the example in /.env_example, before you can run this site...'
  )
}

// https://astro.build/config
export default defineConfig({
  integrations: [
    sanityIntegration({
    projectId: env.PUBLIC_SANITY_PROJECT_ID,
    dataset: env.PUBLIC_SANITY_DATASET,
    apiVersion: env.PUBLIC_SANITY_API_VERSION,
    useCdn: false,
    perspective: 'drafts',
    token: env.PUBLIC_SANITY_VIEWER_TOKEN,
    stega: {
      enabled: true,
        studioUrl: env.PUBLIC_SANITY_STUDIO_PREVIEW_URL
            + env.PUBLIC_SANITY_STUDIO_BASE_PATH,
    },
      studioBasePath: /*env.PUBLIC_SANITY_STUDIO_PREVIEW_URL + */ env.PUBLIC_SANITY_STUDIO_BASE_PATH,
    }),
    react(),
  ],
  vite: {
    resolve: {
      alias:  {
        lodash : 'lodash-es',
        // this next required workaround for Astro bug still present
        ...import.meta.env.PROD && { "react-dom/server": "react-dom/server.edge" },
      }
    }
  },
  output: "server",
  adapter: cloudflare()
});

// n.b. pnpm run build normally, then run the result,
// using node dist/server/entry.mjs
// this will operate normally -- but show the bug!