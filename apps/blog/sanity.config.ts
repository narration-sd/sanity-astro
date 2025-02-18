import { defineConfig } from "sanity";

import { structureTool} from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { defineDocuments, presentationTool } from 'sanity/presentation'
import { media } from 'sanity-plugin-media'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import { schemaTypes } from "./schemas"
import { resolve } from "./src/sanity/lib/resolve";

export const projectId =
   import.meta.env.PUBLIC_SANITY_PROJECT_ID
export const dataset = import.meta.env.PUBLIC_SANITY_DATASET

const SANITY_STUDIO_PREVIEW_URL = (
  import.meta.env.PUBLIC_SANITY_STUDIO_PREVIEW_URL
  || 'http://localhost:4321'
)

export default defineConfig({
  name: "sanity-astro",
  title: "Sanity Astro",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: SANITY_STUDIO_PREVIEW_URL,
      title: 'Presentation',
      resolve: resolve,
    }),
    media(),
    unsplashImageAsset(),
  ],
  schema: {
    types: schemaTypes,
  },
});