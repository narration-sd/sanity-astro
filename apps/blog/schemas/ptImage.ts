import {defineType, defineField } from "sanity";

export default defineType({
  name: "ptImage",
  title: "PT Image",
  type: "image",
  fields: [
    {
      name: 'altText',
      title: 'Alternative Text',
      type: 'string',
      description: 'For accessibility: describe the photo.',
      validation: (Rule) => Rule.required().regex(/\S+/).min(2).error('Alternative (alt) Text must contain words.'),
    },
    {
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: '(Optional) This is used to display with the image giving context to the photo',
    },
    {
      name: 'attribution',
      title: 'Attribution',
      type: 'string',
      description: '(Optional) Just add a name, nothing else is needed 😀',
    },

  ],
  options: {
    hotspot: true,
  },
})