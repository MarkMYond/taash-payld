import type { Block } from 'payload' // Corrected import path
import { createBackgroundColorField } from '../fields/backgroundColor' // Import reusable background color field
import { containerWidthField } from '../fields/containerWidth' // Import reusable container width field

export const TravelersBlock: Block = {
  slug: 'travelers',
  interfaceName: 'TravelersBlock',
  fields: [
    // Reusable background color fields
    createBackgroundColorField('sectionBackgroundColor', 'Section Background Color'),
    createBackgroundColorField('contentBackgroundColor', 'Content Background Color'),
    // Reusable container width field
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
      label: 'Title (for left side content)',
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
      type: 'textarea',
      label: 'Description (for left side content)',
    },
    {
      name: 'buttons',
      type: 'array',
      label: 'Buttons (for left side content)',
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
    {
      name: 'tabsFeature',
      label: 'Tabs Feature (for right side content)',
      type: 'array',
      minRows: 1,
      maxRows: 4,
      fields: [
        {
          name: 'tabTitle',
          type: 'text',
          label: 'Tab Title',
          required: true,
        },
        {
          name: 'tabContent',
          type: 'textarea', // Temporarily changed from richText for diagnostics
          label: 'Tab Content (Text Area)', // Indicate it's a textarea
          required: true,
        },
      ],
    },
  ],
}

export default TravelersBlock
