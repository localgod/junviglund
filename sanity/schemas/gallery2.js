export default {
  name: 'gallery2',
  type: 'document',
  title: 'Gallery v2',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: { type: 'author' },
    },
    {
      name: 'images',
      type: 'array',
      options: {
        layout: 'grid',
      },
      of: [
        {
          type: 'reference',
          to: { type: 'photo' },
        },
      ],
    },
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      images: 'images',
    },
    prepare(selection) {
      const { images } = selection
      return Object.assign({}, selection, {
        subtitle: `Number of images: ${images.length}`,
      })
    },
  },
}