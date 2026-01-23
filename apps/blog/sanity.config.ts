"use no-memo";
"use no-compiler";

import { defineConfig } from "sanity";

import { structureTool} from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { presentationTool } from 'sanity/presentation'
import { media } from 'sanity-plugin-media'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

// import { schemaTypes } from "./schemas";
import { post } from "./schemas/post-v2.ts"; // Explicitly target the .ts file
import blockContent from "./schemas/blockContent.ts";
import ptImage from "./schemas/ptImage.ts";
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

const unwrap = (mod: any) => (mod && mod.default) ? mod.default : mod;

// sanity.config.ts - PUT THIS AT THE TOP
// const inlinePost = {
//   name: 'posti',
//   title: 'Post',
//   type: 'document',
//   fields: [
//     { name: 'title', type: 'string' }
//   ],
//   preview: {
//     select: { title: 'title' },
//     prepare: function(selection) {
//       return { title: selection.title };
//     }
//   }
// };
// const preparePost = function(selection: any) {
//   return { title: selection?.title || 'Untitled' };
// };
//
// const inlinePost = {
//   name: 'posti',
//   title: 'Post',
//   type: 'document',
//   fields: [
//     { name: 'title', type: 'string' }
//   ],
//   preview: {
//     select: { title: 'title' },
//     // PASS THE REFERENCE, NOT THE DEFINITION
//     prepare: preparePost,
//   }
// };

// function preparePost(selection: any) {
//   return { title: selection?.title || 'Untitled' };
// }
//
// // 2. The "Shield": Define the schema as a function that returns an object
// // This sometimes prevents Vite from "probing" the internal properties
// // and proxying the 'prepare' function before it's delivered.
// const createPostSchema = () => ({
//   name: 'posti',
//   title: 'Post',
//   type: 'document',
//   fields: [{ name: 'title', type: 'string' }],
//   preview: {
//     select: { title: 'title' },
//     prepare: preparePost,
//   },
// });

// const inlinePost = {
//   name: 'posti',
//   title: 'Post',
//   type: 'document',
//   fields: [{ name: 'title', type: 'string' }],
//   preview: {
//     select: { title: 'title' },
//     // This "use no-memo" or "use no-compile" (if using the compiler)
//     // is the new React 19 way to prevent function wrapping.
//     prepare: (function(selection: any) {
//       'use no-memo';
//       return { title: selection.title };
//     }).bind(null) // .bind(null) creates a "BoundFunction" identity that React 19 ignores
//   }
// };

// const preparePost = function (selection: any) {
//   return {title: selection.title || 'Untitled'}
// }.bind(null) // The magic trick
//
// const inlinePost = {
//   name: 'posti',
//   title: 'Post',
//   type: 'document',
//   fields: [{name: 'title', type: 'string'}],
//   preview: {
//     select: {title: 'title'},
//     prepare: preparePost,
//   },
// }

const inlinePost = {
  name: 'postin',
  title: 'Post',
  type: 'document',
  fields: [{name: 'title', type: 'string'}],
  preview: {
    select: {title: 'title'},
    prepare: function (selection: any) {
      return {title: selection.title || 'Untitled'}
    }.bind(null),
  },
}

export default defineConfig({
  name: 'sanity-astro',
  title: 'Sanity Astro',
  projectId,
  dataset,
  basePath: '/studio', // *todo* fix this up with environmental
  plugins: [
    structureTool(),
    // visionTool(),
    // presentationTool({
    //   previewUrl: previewUrl,
    //   title: 'Presentation',
    //   resolve: resolve,
    // }),
    // media(), // this seems broken on studio 5.0??
    // unsplashImageAsset(),
  ],
  schema: {
    // types: schemaTypes,
    types: [ inlinePost /*, unwrap(blockContent), unwrap(ptImage)*/],
    // types: [createPostSchema()],
  },
})