import { z } from 'zod';

const socialLink = z.object({
  platform: z.string().trim().min(1, 'Platform is required').max(50),
  url: z.string().url('Invalid URL'),
});

const education = z.object({
  universityName: z.string().trim().min(1, 'University name is required').max(200),
  subject: z.string().trim().min(1, 'Subject is required').max(200),
  country: z.string().trim().min(1, 'Country is required').max(100),
});

const certification = z.object({
  name: z.string().trim().min(1, 'Certification name is required').max(200),
  link: z.string().url('Invalid URL').or(z.literal('')).default(''),
});

const aboutContent = z.object({
  profileImage: z.string().url('Profile image must be a valid URL').or(z.literal('')).default(''),
  aboutContent: z.string().max(20000, 'About content is too long').default(''),
  socialLinks: z.array(socialLink).default([]),
  education: z.array(education).default([]),
  certifications: z.array(certification).default([]),
});

// Singleton: only an update schema is needed (dashboard edits in place)
const updateAbout = z.object({
  body: aboutContent.partial(),
});

export const aboutSchema = {
  updateAbout,
};

export type IAbout = z.infer<typeof aboutContent>;
export type ISocialLink = z.infer<typeof socialLink>;
