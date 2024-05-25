import { defineConfig } from "sanity";
// import { deskTool } from "sanity/desk";
import { presentationTool } from 'sanity/presentation'
import { locate } from './src/structure/locate.ts'

import { structureTool} from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { schemaTypes } from "./schemas";
import {sanityClient} from "sanity:client";

export const projectId =
  import.meta.env.PUBLIC_SANITY_PROJECT_ID! || 'rbnafvhk' // "3do82whm";
export const dataset = import.meta.env.PUBLIC_SANITY_DATASET! || 'production' // "next";

// export default defineConfig({
//   name: "project-name",
//   title: "Project Name",
//   projectId,
//   dataset,
//   plugins: [deskTool(), visionTool()],
//   schema: {
//     types: schemaTypes,
//   },
// });

const SANITY_STUDIO_PREVIEW_URL = (
  import.meta.env.PUBLIC_SANITY_STUDIO_PREVIEW_URL
  || 'http://localhost:4321'
)
// const { projectId, dataset } = sanityClient.config();

export default defineConfig({
  name: "project-name",
  title: "Project Name",
  // n.b. these from examples, even amplified, don't work at all
  projectId,
  dataset,
  // projectId: 'rbnafvhk',
  // dataset: 'production',
  plugins: [
    structureTool(),
    visionTool(),
    presentationTool({
      previewUrl: SANITY_STUDIO_PREVIEW_URL,
      title: 'Presentation',
      locate: locate,
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});