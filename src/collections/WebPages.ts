import type { CollectionConfig } from 'payload';
import { slugField } from '../fields/slug';
import { seoField } from '../fields/seo';
import ContentBlock from '../blocks/ContentBlock'; // Default import

const WebPages: CollectionConfig = {
  slug: 'web-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'updatedAt'],
    description: 'General website pages (e.g., Homepage).',
    group: 'Content Management',
    preview: (doc: any) => { 
      // Basic preview link, assuming slug is used directly.
      // This might need adjustment based on frontend routing.
      const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000'; // Default to common dev port
      if (doc?.slug === 'home') {
        return baseUrl;
      }
      return doc?.slug ? `${baseUrl}/${doc.slug}` : null;
    },
  },
  access: {
    read: () => true, 
  },
  fields: [
    {
      name: 'title',
      label: 'Page Title',
      type: 'text',
      required: true,
    },
    slugField('title'), // Uses the title field to generate the slug
    seoField(), // Adds SEO metadata group
    {
      name: 'layout',
      label: 'Page Layout',
      type: 'blocks',
      minRows: 1,
      blocks: [ContentBlock], // Only allow the simple ContentBlock
      required: true,
    },
  ],
  timestamps: true,
  versions: false, // Keep versions disabled
};

export default WebPages;
