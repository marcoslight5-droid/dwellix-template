import { z } from 'zod';

/** A string provided in both English and Arabic. */
export const localized = z.object({
  en: z.string().trim().min(1, 'English text is required'),
  ar: z.string().trim().min(1, 'Arabic text is required'),
});

const imagePath = z
  .string()
  .trim()
  .regex(/\.(jpe?g|png|webp|avif)$/i, 'Image must be a .jpg, .jpeg, .png, .webp or .avif file')
  .refine((p) => !p.startsWith('/') && !p.includes('..'), 'Image path must be relative to the agents/ folder, e.g. "sample/photo.jpg"');

export const LISTING_TYPES = ['apartment', 'villa', 'townhouse', 'penthouse', 'office'] as const;
export const PURPOSES = ['sale', 'rent'] as const;

export const listingSchema = z
  .object({
    id: z
      .string()
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'id must be lowercase letters, digits and dashes (used in the URL)'),
    title: localized,
    type: z.enum(LISTING_TYPES),
    purpose: z.enum(PURPOSES),
    priceAED: z.number().positive('priceAED must be a positive number'),
    rentPeriod: z.literal('yearly').optional(),
    beds: z.number().int().min(0, 'beds must be 0 (studio) or more'),
    baths: z.number().min(0),
    // Either a plain community name ("Dubai Marina") or a localized pair.
    area: z.union([z.string().trim().min(1), localized]),
    sqft: z.number().positive(),
    photos: z.array(imagePath).min(1, 'Each listing needs at least one photo'),
    description: localized,
    permitNumber: z.string().trim().min(1).optional(),
  })
  .superRefine((l, ctx) => {
    if (l.purpose === 'sale' && l.rentPeriod) {
      ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['rentPeriod'], message: 'rentPeriod is only allowed when purpose is "rent"' });
    }
  })
  .transform((l) => ({
    ...l,
    rentPeriod: l.purpose === 'rent' ? (l.rentPeriod ?? 'yearly') : undefined,
    area: typeof l.area === 'string' ? { en: l.area, ar: l.area } : l.area,
  }));

export const agentFileSchema = z
  .object({
    agent: z.object({
      name: localized,
      photo: imagePath,
      agency: localized,
      brn: z.string().trim().regex(/^\d{3,10}$/, 'brn (RERA BRN) must be digits only'),
      whatsapp: z
        .string()
        .trim()
        .regex(/^\+[1-9]\d{7,14}$/, 'whatsapp must be in E.164 format, e.g. +971501234567'),
      email: z.string().trim().email().optional(),
      focusArea: localized,
      languages: z.array(z.string().trim().min(1)).min(1),
      bio: localized,
      accentColor: z
        .string()
        .regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/, 'accentColor must be a hex color like #8C6239')
        .optional(),
    }),
    listings: z.array(listingSchema).min(3, 'Provide at least 3 listings').max(6, 'Provide at most 6 listings'),
  })
  .superRefine((data, ctx) => {
    const seen = new Set<string>();
    data.listings.forEach((l, i) => {
      if (seen.has(l.id)) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, path: ['listings', i, 'id'], message: `Duplicate listing id "${l.id}"` });
      }
      seen.add(l.id);
    });
  });

export type AgentFile = z.output<typeof agentFileSchema>;
export type Agent = AgentFile['agent'];
export type Listing = AgentFile['listings'][number];
export type Localized = z.output<typeof localized>;
