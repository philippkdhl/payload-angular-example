import {CollectionConfig, slugField} from "payload";
import {authenticated} from "@/access/authenticated";
import {isEditorOrAdmin} from "@/access/roles";
import {RichTextBlock} from "@/blocks/RichTextBlock";

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: {
    singular: {
      de: 'Seite',
      en: 'Page',
    },
    plural: {
      de: 'Seiten',
      en: 'Pages',
    }
  },
  access: {
    read: () => true,
    create: (args) => authenticated(args) && isEditorOrAdmin(args),
    delete: (args) => authenticated(args) && isEditorOrAdmin(args),
    update: (args) => authenticated(args) && isEditorOrAdmin(args),
  },
  defaultPopulate: {
    title: true,
    slug: true,
    icon: true,
  },
  admin: {
    defaultColumns: ['title', 'slug', 'layout', 'updatedAt', 'icon'],
    livePreview: {
      url: ({data, req, locale}) => {
        return `${process.env.FRONTEND_URL}/cms/${data?.slug}/${locale?.code}`
      },
    },
    preview: (doc) => {
      return `${process.env.FRONTEND_URL}/cms/${doc.slug}`
    },
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true
    },
    {
      name: 'icon',
      type: 'upload',
      relationTo: 'media',
      label: {
        de: 'Navigationsbox Icon',
        en: 'Navigation card Icon',
      },
      required: false,
      filterOptions: {
        mimeType: {
          in: [
            'image/svg+xml',
          ]
        }
      },
      admin: {
        description: {
          de: 'SVG-Format, ',
          en: 'SVG format'
        }
      }
    },
    {
      label: 'Content',
      name: 'layout',
      type: 'blocks',
      blocks: [
        RichTextBlock,
      ],
      required: true,
      admin: {
        initCollapsed: true,
      }
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
      },
    },
    slugField()
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}