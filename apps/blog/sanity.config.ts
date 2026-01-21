import { defineConfig } from "sanity";

import { structureTool} from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from 'sanity/presentation'
import { media } from 'sanity-plugin-media'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import { schemaTypes } from "./schemas";
import { resolve } from "./src/structure/resolve";

// n.b. What we're doing here is using js/ts optional chaining,
// to select which import method to use for environmentals.
// Using the wrong flavor will silently crash the studio, for
// example, and note that the different naming prefixes must be
// provided for in the .env file or deployment environmentals.
const projectId = import.meta.env?.PUBLIC_SANITY_PROJECT_ID
  || process.env.SANITY_STUDIO_PROJECT_ID
const dataset = import.meta.env?.PUBLIC_SANITY_DATASET
  || process.env.SANITY_STUDIO_DATASET
const previewUrl =
  import.meta.env?.PUBLIC_SANITY_STUDIO_PREVIEW_URL
  || process.env.SANITY_STUDIO_PREVIEW_URL

export default defineConfig({
  name: "sanity-astro",
  title: "Sanity Astro",
  projectId,
  dataset,
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: previewUrl,
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