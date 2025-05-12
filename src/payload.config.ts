import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// Import the cloud storage plugin
import { cloudStoragePlugin } from '@payloadcms/plugin-cloud-storage'
// Import our custom adapter for DigitalOcean Spaces
import { createDigitalOceanAdapter } from './lib/digitalOceanAdapter'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import Categories from './collections/Categories'
import WebPages from './collections/WebPages'
import WikiPages from './collections/WikiPages'
import RegistryPages from './collections/RegistryPages'
import NavigationCache from './collections/NavigationCache'
import { Templates } from './collections/Templates' // Added import

// Import Globals
import Footer from './globals/Footer'

// Import Blocks
import ContentBlock from './blocks/ContentBlock';
import { ImageBlock } from './blocks/ImageBlock';
import { FeatureSectionBlock } from './blocks/FeatureSectionBlock';
import { ClientLogosBlock } from './blocks/ClientLogosBlock';
import { SolutionsListBlock } from './blocks/SolutionsListBlock';
import { AiSupportSectionBlock } from './blocks/AiSupportSectionBlock';
import { SupportNinjaSectionBlock } from './blocks/SupportNinjaSectionBlock';
import { TextImageSectionBlock } from './blocks/TextImageSectionBlock';
import { ApproachTabsBlock } from './blocks/ApproachTabsBlock';
import { CustomizedApproachBlock } from './blocks/CustomizedApproachBlock';
import { CaseStudySectionBlock } from './blocks/CaseStudySectionBlock';
import { TemplateSectionBlock } from './blocks/TemplateSectionBlock';
import { RelatedTemplateSectionBlock } from './blocks/RelatedTemplateSectionBlock';
import { CtaSectionBlock } from './blocks/CtaSectionBlock';
import { NewTemplatesSectionBlock } from './blocks/NewTemplatesSectionBlock';
import { ProductFeaturesBlock } from './blocks/ProductFeaturesBlock';
import { SectorsSectionBlock } from './blocks/SectorsSectionBlock';
import { ScheduleCallBlock } from './blocks/ScheduleCallBlock';
import { PricingPlansBlock } from './blocks/PricingPlansBlock';
import { TravelersBlock } from './blocks/TravelersBlock';

const AllBlocks = [
  ContentBlock,
  ImageBlock,
  FeatureSectionBlock,
  ClientLogosBlock,
  SolutionsListBlock,
  AiSupportSectionBlock,
  SupportNinjaSectionBlock,
  TextImageSectionBlock,
  ApproachTabsBlock,
  CustomizedApproachBlock,
  CaseStudySectionBlock,
  TemplateSectionBlock,
  RelatedTemplateSectionBlock,
  CtaSectionBlock,
  NewTemplatesSectionBlock,
  ProductFeaturesBlock,
  SectorsSectionBlock,
  ScheduleCallBlock,
  PricingPlansBlock,
  TravelersBlock,
];

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // favicon is not a valid property in admin config - removed to fix build error
  },
  collections: [Users, Media, Categories, WebPages, WikiPages, RegistryPages, NavigationCache, Templates], // Added NavigationCache
  globals: [Footer], // Add the Footer global
  editor: lexicalEditor(),
  blocks: AllBlocks, // Added all blocks
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
    // @ts-ignore - Type safety will be handled at runtime by the plugin
    cloudStoragePlugin({
      collections: {
        media: {
          // Use our custom adapter for DigitalOcean Spaces with specific configuration
          adapter: createDigitalOceanAdapter({
            region: 'ams3',
            endpoint: 'ams3.digitaloceanspaces.com',
            bucket: 'yond',
            prefix: 'tash-payload',
            // Credentials come from environment variables
          }),
          disableLocalStorage: true,
        },
      },
    }),
  ],
  cors: [
    'http://localhost:3000', // Nuxt frontend
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3333', // Payload admin UI itself
    'https://taash-payld.vercel.app', // The backend itself
    'https://fetest-bay.vercel.app', // The fetest frontend
    'https://frontend-cyan-nine-80.vercel.app', // New frontend deployment
    '*', // Allow all origins - remove in production
    // Add your Vercel deployment URLs here for production if needed
  ],
  csrf: [
    'http://localhost:3000', // Nuxt frontend
    process.env.PAYLOAD_PUBLIC_SERVER_URL || 'http://localhost:3333', // Payload admin UI itself
    'https://taash-payld.vercel.app', // The backend itself
    'https://fetest-bay.vercel.app', // The fetest frontend
    'https://frontend-cyan-nine-80.vercel.app', // New frontend deployment
    // Add your Vercel deployment URLs here for production if needed
  ],
})
