import type {Field, GroupField} from 'payload'

import deepMerge from '@/utilities/deepMerge'

export type LinkAppearances = 'primary'

export const appearanceOptions: Record<LinkAppearances, { label: string; value: string }> = {
  primary: {
    label: 'Primär Button (rot)',
    value: 'primary',
  },
}

type LinkType = (options?: {
  appearances?: LinkAppearances[] | false
  disableLabel?: boolean
  overrides?: any
}) => Field

export const link: LinkType = ({ appearances, disableLabel = false, overrides = {} } = {}) => {
  const linkResult: GroupField = {
    name: 'link',
    type: 'group',
    admin: {
      hideGutter: true,
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'type',
            label: {
              de: 'Typ',
              en: 'Type',
            },
            type: 'radio',
            admin: {
              layout: 'horizontal',
              width: '50%',
            },
            defaultValue: 'reference',
            options: [
              {
                label: {
                  de: 'Interner Link',
                  en: 'Internal link'
                },
                value: 'reference',
              },
              {
                label: {
                  de: 'Externer Link',
                  en: 'Custom URL'
                },
                value: 'custom',
              },
            ],
          },
          {
            name: 'newTab',
            type: 'checkbox',
            defaultValue: false,
            admin: {
              condition: (_data, siblingData) => siblingData?.linkType === 'internal',
              hidden: true
            },
            hooks: {
              beforeChange: [
                ({siblingData, value}) => {
                  if (siblingData?.linkType === 'internal') {
                    return false;
                  }
                  return value !== undefined ? value : true;
                }
              ]
            }
          },
        ],
      },
    ],
  }

  const linkTypes: Field[] = [
    {
      name: 'reference',
      type: 'relationship',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'reference',
        sortOptions: {
          'pages': 'title'
        },
      },
      label: {
        de: 'Zu verlinkende Seite',
        en: 'Document to link to'
      },
      relationTo: ['pages'],
      required: true,
    },
    {
      name: 'url',
      type: 'text',
      admin: {
        condition: (_, siblingData) => siblingData?.type === 'custom',
      },
      label: {
        de: 'Externe URL',
        en: 'Custom URL'
      },
      required: true,
    },
  ]

  if (!disableLabel) {
    // First row: Link type fields
    linkResult.fields.push({
      type: 'row',
      fields: linkTypes,
    })

    // Second row: Label field
    linkResult.fields.push({
      type: 'row',
      fields: [
        {
          name: 'label',
          type: 'text',
          localized: true,
          label: {
            de: 'Link Text',
            en: 'Label'
          },
          required: true,
        },
      ],
    })
  } else {
    linkResult.fields = [...linkResult.fields, ...linkTypes]
  }

  if (appearances !== false) {
    let appearanceOptionsToUse = [appearanceOptions.primary]

    if (appearances) {
      appearanceOptionsToUse = appearances.map((appearance) => appearanceOptions[appearance])
    }

    linkResult.fields.push({
      name: 'appearance',
      label: {
        de: 'Aussehen',
        en: 'Appearance',
      },
      type: 'select',
      defaultValue: 'primary',
      options: appearanceOptionsToUse,
    })
  }

  return deepMerge(linkResult, overrides)
}
