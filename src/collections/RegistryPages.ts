import type { CollectionConfig } from 'payload';
import { slugField } from '../fields/slug';
import { seoField } from '../fields/seo';
import ContentBlock from '../blocks/ContentBlock'; // Default import

const RegistryPages: CollectionConfig = {
  slug: 'registry-pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'updatedAt'],
    description: 'Pages for the registry section.',
    group: 'Content Management',
    preview: (doc: any) => {
      const baseUrl = process.env.NUXT_PUBLIC_SITE_URL || 'http://localhost:3000';
      return doc?.slug ? `${baseUrl}/registry/${doc.slug}` : null;
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
    slugField('title'),
    seoField(),
    {
      name: 'category',
      label: 'Category',
      type: 'relationship',
      relationTo: 'categories', 
      required: false,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'pageBuilder', // Changed from 'layout' to 'pageBuilder' for consistency if desired
      label: 'Page Content',
      type: 'blocks',
      minRows: 1,
      blocks: [ContentBlock], // Only allow the simple ContentBlock
      required: true,
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Published', value: 'published' },
      ],
      defaultValue: 'draft',
      required: true,
      admin: {
        position: 'sidebar',
      },
      index: true,
    },
    {
      name: 'sort',
      label: 'Sort Order',
      type: 'number',
      admin: {
        position: 'sidebar',
        description: 'Order in navigation (lower numbers appear first).',
        step: 1,
      },
      index: true,
    },
    {
      name: 'isSectionHomepage',
      label: 'Is Section Homepage?',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        position: 'sidebar',
        description: 'If true, this page acts as the main page for its category/section.',
      },
    },
    {
      name: 'parent',
      label: 'Parent Page',
      type: 'relationship',
      relationTo: 'registry-pages', // Self-relation for hierarchy
      admin: {
        position: 'sidebar',
      },
      index: true,
    },
    {
      name: 'icon', 
      label: 'Icon (e.g., Phosphor Icon name)',
      type: 'text', 
      admin: {
        position: 'sidebar',
        description: 'Optional icon name for navigation display.',
      },
    },
  ],
  timestamps: true,
  versions: false, 
};

export default RegistryPages;
