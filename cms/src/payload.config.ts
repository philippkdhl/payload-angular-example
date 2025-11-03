// storage-adapter-import-placeholder
import {mongooseAdapter} from '@payloadcms/db-mongodb'
import {payloadCloudPlugin} from '@payloadcms/payload-cloud'
import {lexicalEditor} from '@payloadcms/richtext-lexical'
import path from 'path'
import {buildConfig} from 'payload'
import {fileURLToPath} from 'url'
import sharp from 'sharp'

import {Users} from './collections/Users'
import {Media} from './collections/Media'
import {Pages} from "@/collections/Pages";
import {en} from "@payloadcms/translations/languages/en";
import {de} from "@payloadcms/translations/languages/de";


const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    fallbackLanguage: 'de',
    supportedLanguages: {en, de},
  },
  localization: {
    locales: [
      {label: 'Deutsch', code: 'de'},
      {label: 'English', code: 'en'},
    ],
    defaultLocale: 'de',
    fallback: true
  },
  cors: ['http://localhost:4200'],
  collections: [Pages, Media, Users],
  globals: [],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
