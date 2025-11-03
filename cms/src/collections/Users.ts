import {CollectionConfig} from "payload";
import {authenticated} from "@/access/authenticated";
import {isAdmin} from "@/access/roles";


export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: {
      de: 'Benutzer',
      en: 'User',
    },
    plural: {
      de: 'Benutzer',
      en: 'Users',
    },
  },
  access: {
    read: (args) => authenticated(args) && isAdmin(args),
    create: (args) => authenticated(args) && isAdmin(args),
    delete: (args) => authenticated(args) && isAdmin(args),
    update: (args) => authenticated(args) && isAdmin(args),
    admin: (args) => authenticated(args),
  },
  admin: {
    defaultColumns: ['name', 'email', 'roles'],
    useAsTitle: 'name',
  },
  auth: true,
  fields: [
    {
      name: 'name',
      type: 'text',
    },
    {
      label: {
        en: 'Roles',
        de: 'Rollen'
      },
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['editor'], // Standard: Editor
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
      ],
      access: {
        read: ({ req }) => isAdmin({ req }),
        update: ({ req }) => isAdmin({ req }),
      }
    },
  ],
  timestamps: true,
}
