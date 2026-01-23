import sanityIntegration from "@sanity/astro";
import { defineConfig } from "astro/config";
import vercel from "@astrojs/vercel";
import react from "@astrojs/react";
import { loadEnv } from 'vite'

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
        studioUrl: env.PUBLIC_SANITY_STUDIO_PREVIEW_URL + env.PUBLIC_SANITY_STUDIO_BASE_PATH,
      },
      // reminder here: this no more!!, with own studio page!!
      // studioBasePath: env.PUBLIC_SANITY_STUDIO_BASE_PATH,
    }),
    // react(),
    react({
      babel: {
        plugins: [['babel-plugin-react-compiler', {target: '19'}]],
      },
    }),
  ],
  // this block to resolve the react-dropzone conflict
  vite: {
    // ssr: {
    //   // We use a regex to catch both the plugin and its dependencies
    //   // This forces Vite to process them instead of Node's strict ESM loader
    //   noExternal: [/sanity-plugin-media/, /react-dropzone/],
    // },
    // // This helps Vite handle the CommonJS transformation specifically for these packages
    // optimizeDeps: {
    //   include: ['react-dropzone', 'sanity-plugin-media'],
    // },
    // ssr: {
    //   noExternal: [/sanity-plugin-media/, /react-dropzone/],
    // },
    // optimizeDeps: {
    //   // Keep your existing includes
    //   include: ['react-dropzone', 'sanity-plugin-media'],
    //   // EXCLUDE Sanity core to prevent the "Proxy wrapping"
    //   exclude: ['sanity'],
    // },
    // // Ensure Vite doesn't try to be too smart with your schema files
    // resolve: {
    //   // This tells Vite to prioritize the actual file over any
    //   // cached or pre-bundled version
    //   mainFields: ['module', 'jsnext:main', 'jsnext'],
    // },
    // ssr: {
    //   // Force Vite to process these as source code rather than external Node modules
    //   noExternal: [
    //     /sanity-plugin-media/,
    //     /react-dropzone/,
    //     /react-is/,
    //     /@sanity\/ui/
    //   ],
    // },
    // optimizeDeps: {
    //   include: [
    //     'react-dropzone',
    //     'sanity-plugin-media',
    //     'react-is', // Force pre-bundling to resolve 'isValidElementType'
    //     'sanity',
    //     'react',
    //     'react-dom'
    //   ],
    // },
    // resolve: {
    //   // This ensures that React 19 doesn't pull in multiple versions of itself
    //   dedupe: ['react', 'react-dom', 'react-is'],
    // }
    ssr: {
      // REMOVE react-is and @sanity/ui from here.
      // They are CJS-heavy and crashing the SSR evaluator.
      noExternal: [/sanity-plugin-media/, /react-dropzone/],
    },
    optimizeDeps: {
      include: [
        'react-dropzone',
        'sanity-plugin-media',
        'react-is', // KEEP this here. Vite will pre-bundle it into ESM.
        'sanity',
        'react',
        'react-dom',
        '@sanity/ui',
      ],
    },
    resolve: {
      dedupe: ['react', 'react-dom', 'react-is'],
    },
  },
  output: 'server',
  adapter: vercel({
    edgeMiddleware: true,
  }),
})
