import type { Block, Field } from 'payload'
import { backgroundColorOptions, createBackgroundColorField } from '../fields/backgroundColor' // Import options and helper
import { containerWidthField } from '../fields/containerWidth'

export const TextImageSectionBlock: Block = {
  slug: 'textImageSection',
  interfaceName: 'TextImageSectionBlock',
  fields: [
    { // Inlined definition for sectionBackgroundColor
      name: 'sectionBackgroundColor',
      label: 'Section Background Color',
      type: 'select',
      options: backgroundColorOptions,
      defaultValue: 'white',
      admin: {
        description: 'Select the background color.',
      },
    },
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'), // Keep other as helper for now
    containerWidthField,
     {
       name: 'removeTopPadding',
       type: 'checkbox',
       label: 'Remove Top Padding',
       defaultValue: false,
     },
     {
       name: 'removeBottomPadding',
       type: 'checkbox',
       label: 'Remove Bottom Padding',
       defaultValue: false,
     },
     {
       name: 'title',
      type: 'text',
      label: 'Title',
    },
    {
      name: 'titleStyle',
      type: 'select',
      label: 'Title Style',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Large (Homepage Style)', value: 'large' },
      ],
      defaultValue: 'standard',
      admin: {
        description: 'Select the display style for the title. "Large" matches the homepage hero title size.',
      },
    },
    {
      name: 'description',
      type: 'textarea', // Using textarea for consistency, can be richText if needed
      label: 'Description',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: false, // Making image optional as CareerSection didn't require it
    },
    {
      name: 'imagePosition',
      type: 'select',
      label: 'Image Position',
      options: [
        { label: 'Left', value: 'left' },
        { label: 'Right', value: 'right' },
      ],
      defaultValue: 'right', // Default to image on the right (like PeopleSection)
      required: true,
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons',
      minRows: 0,
      maxRows: 2,
      fields: [
        {
          name: 'text',
          type: 'text',
          label: 'Button Text',
          required: true,
        },
        {
          name: 'url',
          type: 'text',
          label: 'Button URL',
          required: true,
        },
        {
          name: 'style',
          type: 'select',
          label: 'Button Style',
          options: [
            { label: 'Primary (Solid Background)', value: 'primary' },
            { label: 'Secondary (Outline)', value: 'secondary' },
          ],
          defaultValue: 'primary',
          required: true,
        },
      ],
    },
  ],
}

export default TextImageSectionBlock
