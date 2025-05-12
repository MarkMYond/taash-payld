import type { GlobalConfig } from 'payload' // Corrected import path
import { lexicalEditor } from '@payloadcms/richtext-lexical' // Assuming lexical is used for rich text

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer Content',
  access: {
    read: () => true, // Publicly readable
  },
  fields: [
    {
      name: 'logo', // While TheFooter.vue uses a hardcoded SVG, a logo field is standard
      label: 'Footer Logo (Optional - currently hardcoded in frontend)',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'tagline',
      label: 'Tagline / Strapline',
      type: 'textarea',
    },
    {
      name: 'linkColumns',
      label: 'Footer Link Columns',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'title',
          label: 'Column Title',
          type: 'text',
          required: true,
        },
        {
          name: 'links',
          label: 'Links',
          type: 'array',
          fields: [
            {
              name: 'text',
              label: 'Link Text',
              type: 'text',
              required: true,
            },
            {
              name: 'url',
              label: 'URL',
              type: 'text',
              required: true,
            },
          ],
        },
      ],
    },
    {
      name: 'subscribePlaceholder',
      label: 'Subscribe Input Placeholder Text',
      type: 'text',
      defaultValue: 'Email Address Here',
    },
    {
      name: 'socialLinks',
      label: 'Social Media Links',
      type: 'array',
      fields: [
        {
          name: 'iconName',
          label: 'Phosphor Icon Name',
          type: 'text',
          admin: {
            description: 'Enter the Phosphor Icon name (e.g., TwitterLogo, LinkedinLogo). Do not include "Ph".',
          },
          required: true,
        },
        {
          name: 'url',
          label: 'Social Profile URL',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'copyright',
      label: 'Copyright Text',
      type: 'richText',
      editor: lexicalEditor({}), // Add editor configuration if needed
      required: true,
    },
  ],
}

export default Footer;
