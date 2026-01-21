// sanity.cli.js
import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.PUBLIC_SANITY_DATASET,
  },
  deployment: {
    appId: 'ivirq7br6j1p6ytxbj65o1ep',
    autoUpdates: true,
  }
})