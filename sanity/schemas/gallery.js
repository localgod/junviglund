export default {
  name: 'gallery',
  type: 'document',
  title: 'Gallery',
  fields: [
    {
      name: 'images',
      type: 'array', // supports drag'n'drop of multiple files
      options: {
        layout: 'grid'
      },
      of: [{
        type: 'image'
      }]
    }
  ]
}
  