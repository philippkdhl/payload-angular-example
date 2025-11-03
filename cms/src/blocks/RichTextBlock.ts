import {Block} from 'payload'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  UnorderedListFeature,
  UploadFeature
} from '@payloadcms/richtext-lexical'

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: {
    singular: 'Rich Text Block',
    plural: 'Rich Text Blocks',
  },
  imageURL: '/blocks/RichText.svg',
  fields: [
    {
      name: 'content',
      type: 'richText',
      localized: true,
      required: true,
      editor: lexicalEditor({
        features: ({rootFeatures}) => {
          return [
            ...rootFeatures,
            HeadingFeature({enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5']}),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            UnorderedListFeature(),
            UploadFeature({
              collections: {
                uploads: {
                  fields: [
                    {
                      name: 'caption',
                      type: 'richText',
                      editor: lexicalEditor(),
                    },
                  ],
                },
              },
            }),
          ]
        },
      }),
    },
  ],
}
