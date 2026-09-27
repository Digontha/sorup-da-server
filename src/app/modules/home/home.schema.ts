import { z } from 'zod';

const homeContent = z.object({
  cvUrl: z.string().url('CV must be a valid URL').or(z.literal('')).default(''),
  tagline: z.string().max(300, 'Tagline is too long').default(''),
  shareYourIdeaText: z.string().max(500, 'Share your idea text is too long').default(''),
  shareYourIdeaCtaLabel: z.string().max(100, 'CTA label is too long').default(''),
  shareYourIdeaCtaLink: z
    .string()
    .url('CTA link must be a valid URL')
    .or(z.literal(''))
    .default(''),
  images: z.array(z.string().url('Image must be a valid URL')).default([]),
});

// Singleton: only an update schema is needed (dashboard edits in place)
const updateHome = z.object({
  body: homeContent.partial(),
});

export const homeSchema = {
  updateHome,
};

export type IHome = z.infer<typeof homeContent>;
