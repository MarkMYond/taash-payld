import type { Block, Field } from 'payload'

// Reusable color options (can be imported from a shared file if used in many blocks)
const sectionColorOptions: { label: string; value: string }[] = [
  { label: 'White', value: 'white' },
  { label: 'Light Grey', value: 'light-grey' },
  { label: 'Brand 50 (Lightest Brand)', value: 'brand-50' },
  { label: 'Brand 900 (Darkest Brand)', value: 'brand-900' },
  { label: 'Brand Primary', value: 'brand-primary' },
];

// Options for card background colors (could be text if more flexibility is needed)
const cardBgColorOptions: { label: string; value: string }[] = [
    { label: 'White', value: 'bg-white' },
    { label: 'Light Grey', value: 'bg-light-grey' },
    { label: 'Sand', value: 'bg-sand' }, // Example, assuming 'bg-sand' is a defined Tailwind class
    { label: 'Brand 50', value: 'bg-brand-50' },
];

export const PricingPlansBlock: Block = {
  slug: 'pricingPlans', // Matches the slug from the error
  interfaceName: 'PricingPlansBlock', // For payload-types.ts
  fields: [
    {
      name: 'title',
      label: 'Section Title',
      type: 'text',
      defaultValue: 'Plans for every stage of your company',
    },
    {
      name: 'mainCtaText',
      label: 'Main CTA Button Text',
      type: 'text',
      defaultValue: 'Get Started',
    },
    {
      name: 'mainCtaLink',
      label: 'Main CTA Button Link',
      type: 'text',
      defaultValue: '/contact-us',
    },
    {
      name: 'mainCtaStyle',
      label: 'Main CTA Button Style',
      type: 'select',
      options: [
        { label: 'Primary', value: 'primary' },
        { label: 'Secondary', value: 'secondary' },
      ],
      defaultValue: 'primary',
    },
    {
      name: 'sectionBackgroundColor',
      label: 'Section Background Color',
      type: 'select',
      options: sectionColorOptions,
      defaultValue: 'white',
    },
    {
      name: 'removeTopPadding',
      label: 'Remove Top Padding',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'removeBottomPadding',
      label: 'Remove Bottom Padding',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'plans',
      label: 'Pricing Plans',
      type: 'array',
      minRows: 1,
      maxRows: 3, // Common to have 2 or 3 plans
      fields: [
        {
          name: 'name',
          label: 'Plan Name',
          type: 'text',
          required: true,
        },
        {
          name: 'description',
          label: 'Plan Description',
          type: 'textarea',
        },
        {
          name: 'monthlyPrice',
          label: 'Monthly Price (e.g., $29, POA)',
          type: 'text',
        },
        {
          name: 'annualPrice',
          label: 'Annual Price (e.g., $290, Optional)',
          type: 'text',
        },
        {
          name: 'priceSuffix',
          label: 'Price Suffix (e.g., /month, /user/month)',
          type: 'text',
          defaultValue: '/month',
        },
        {
          name: 'cardBackgroundColor',
          label: 'Card Background Color',
          type: 'select', // Or 'text' if users should input Tailwind classes directly
          options: cardBgColorOptions,
          defaultValue: 'bg-white',
          admin: {
            description: 'Select a background color for this plan card. Ensure the Tailwind class exists.',
          }
        },
        {
          name: 'ctaButtonLabel',
          label: 'CTA Button Label',
          type: 'text',
          defaultValue: 'Get Started',
        },
        {
          name: 'ctaButtonLink',
          label: 'CTA Button Link URL',
          type: 'text',
          defaultValue: '/contact-us',
        },
        {
          name: 'isMostPopular',
          label: 'Is this the most popular plan?',
          type: 'checkbox',
          defaultValue: false,
        },
        {
          name: 'features',
          label: 'Plan Features',
          type: 'array',
          fields: [
            {
              name: 'featureText',
              label: 'Feature Text',
              type: 'text',
              required: true,
            },
            {
              name: 'isIncluded',
              label: 'Is Included (vs. e.g., limited or add-on)',
              type: 'checkbox',
              defaultValue: true,
            },
          ],
        },
      ],
    },
  ],
};
