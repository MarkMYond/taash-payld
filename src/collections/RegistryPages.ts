import type { CollectionConfig, CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload';
import { generateRegistryNavigation } from '../hooks/generateRegistryNavigation';
import { slugField } from '../fields/slug';
import { seoField } from '../fields/seo';
import ContentBlock from '../blocks/ContentBlock'; // Default import

// After change/delete hooks to regenerate the registry navigation
const afterChangeHook: CollectionAfterChangeHook = async ({ req }) => {
  console.log('Registry page changed, regenerating navigation...');
  try {
    await generateRegistryNavigation(req.payload);
  } catch (error) {
    console.error('Error regenerating registry navigation after change:', error);
  }
};

const afterDeleteHook: CollectionAfterDeleteHook = async ({ req }) => {
  console.log('Registry page deleted, regenerating navigation...');
  try {
    await generateRegistryNavigation(req.payload);
  } catch (error) {
    console.error('Error regenerating registry navigation after delete:', error);
  }
};

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
    {
      name: 'backgroundSettings',
      label: 'Micro Header',
      type: 'group',
      admin: {
        position: 'sidebar',
      },
      fields: [
        {
          name: 'backgroundImage',
          label: 'Background Image',
          type: 'upload',
          relationTo: 'media',
          admin: {
            description: 'Optional background image for the page.',
          },
        },
        {
          name: 'backgroundOverlay',
          label: 'Background Overlay',
          type: 'select',
          options: [
            { label: 'None / Default Gradient', value: 'default-gradient' },
            { label: 'Primary 25', value: 'primary-25' },
            { label: 'Primary 50', value: 'primary-50' },
            { label: 'Primary 100', value: 'primary-100' },
            { label: 'Primary 200', value: 'primary-200' },
            { label: 'Primary 300', value: 'primary-300' },
            { label: 'Primary 400', value: 'primary-400' },
            { label: 'Primary 500', value: 'primary-500' },
            { label: 'Primary 600', value: 'primary-600' },
            { label: 'Primary 700', value: 'primary-700' },
            { label: 'Primary 800', value: 'primary-800' },
            { label: 'Primary 900', value: 'primary-900' },
            { label: 'Primary 950', value: 'primary-950' },
            { label: 'Sand', value: 'sand' },
            { label: 'Pink', value: 'pink-light' },
            { label: 'Coral', value: 'coral-light' },
            { label: 'Pink (Mid)', value: 'pink-mid' },
            { label: 'Purple', value: 'purple-light' },
            { label: 'Blue', value: 'blue-light' },
            { label: 'Aqua', value: 'aqua-light' },
            { label: 'Green', value: 'green-light' },
            { label: 'Light Green', value: 'light-green' },
            { label: 'Grass', value: 'grass-light' },
            { label: 'Light Grey', value: 'light-grey' },
            { label: 'Navy', value: 'navy-dark' },
          ],
          defaultValue: 'default-gradient',
          admin: {
            description: 'Select a background color for the header area.',
          },
        },
      ],
    },
    seoField(),
  ],
  timestamps: true,
  versions: false,
  hooks: {
    afterChange: [afterChangeHook],
    afterDelete: [afterDeleteHook],
  },
};

export default RegistryPages;
