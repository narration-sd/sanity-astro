import {defineField, defineType} from 'sanity'
export const post = defineType({
  name: 'postx',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      validation: (Rule) => Rule.required(),
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 4,
    }),
    /*
    defineField({
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
*/
  ],
  // preview: {
  //   select: {
  //     title: 'title',
  //     author: 'author.name',
  //     media: 'mainImage',
  //   },
  //   prepare(selection: any) {
  //     const {title, author, media} = selection
  //     return {
  //       title: title || 'Untitled Post',
  //       subtitle: author ? `by ${author}` : '',
  //       media: media,
  //     }
  //   },
  // },
  // preview: { // simplified for studio problem
  //   select: {
  //     title: 'title',
  //   },
  //   prepare ({ title }: any) {
  //     console.log("MARKER_FOUND_HERE"); // Add this string
  //     return {
  //       title: title || 'Untitled',
  //     }
  //   },
  // },
  // The "Primitive" Preview
  preview: {
    select: {
      title: 'title',
    },
    prepare: function (selection) {
      return {
        title: selection.title || 'Untitled',
      }
    },
  },
})
