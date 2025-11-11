/**
 * Event validation schemas using Zod
 */

import { z } from 'zod';

export const createEventSchema = z.object({
  title: z
    .string()
    .min(1, 'Event title is required')
    .min(3, 'Title must be at least 3 characters')
    .max(200, 'Title must be less than 200 characters'),
  description: z
    .string()
    .min(1, 'Event description is required')
    .min(10, 'Description must be at least 10 characters')
    .max(2000, 'Description must be less than 2000 characters'),
  category: z
    .string()
    .min(1, 'Category is required'),
  eventType: z.enum(['technical', 'cultural', 'workshop', 'competition'], {
    errorMap: () => ({ message: 'Invalid event type' }),
  }),
  date: z
    .string()
    .min(1, 'Event date is required')
    .or(z.date()),
  venue: z
    .string()
    .min(1, 'Venue is required')
    .max(200, 'Venue must be less than 200 characters'),
  capacity: z
    .number()
    .min(1, 'Capacity must be at least 1')
    .max(10000, 'Capacity must be less than 10000')
    .or(z.string().regex(/^\d+$/).transform(Number)),
  image: z
    .string()
    .url('Invalid image URL')
    .optional(),
  rules: z
    .array(z.string())
    .optional(),
  coordinators: z
    .array(z.string())
    .optional(),
  prizePool: z
    .number()
    .min(0, 'Prize pool must be positive')
    .optional()
    .or(z.string().regex(/^\d+$/).transform(Number).optional()),
  registrationDeadline: z
    .string()
    .or(z.date())
    .optional(),
  teamSize: z
    .object({
      min: z.number().min(1, 'Minimum team size must be at least 1'),
      max: z.number().min(1, 'Maximum team size must be at least 1'),
    })
    .refine((data) => data.max >= data.min, {
      message: 'Maximum team size must be greater than or equal to minimum',
    })
    .optional(),
});

export const updateEventSchema = createEventSchema.partial().extend({
  isActive: z.boolean().optional(),
});

export const eventRegistrationSchema = z.object({
  eventId: z
    .string()
    .min(1, 'Event ID is required'),
  teamName: z
    .string()
    .min(2, 'Team name must be at least 2 characters')
    .max(100, 'Team name must be less than 100 characters')
    .optional(),
  teamMembers: z
    .array(z.string())
    .min(1, 'At least one team member is required')
    .optional(),
});

export const updateParticipationStatusSchema = z.object({
  participationId: z
    .string()
    .min(1, 'Participation ID is required'),
  status: z.enum(['approved', 'rejected', 'cancelled'], {
    errorMap: () => ({ message: 'Invalid status' }),
  }),
  remarks: z
    .string()
    .max(500, 'Remarks must be less than 500 characters')
    .optional(),
});

export const createResultSchema = z.object({
  eventId: z
    .string()
    .min(1, 'Event ID is required'),
  participationId: z
    .string()
    .min(1, 'Participation ID is required'),
  position: z
    .number()
    .min(1, 'Position must be at least 1')
    .max(100, 'Position must be less than 100')
    .or(z.string().regex(/^\d+$/).transform(Number)),
  prize: z
    .string()
    .max(200, 'Prize description must be less than 200 characters')
    .optional(),
  remarks: z
    .string()
    .max(500, 'Remarks must be less than 500 characters')
    .optional(),
});

export const verifyCertificateSchema = z.object({
  certificateId: z
    .string()
    .min(1, 'Certificate ID is required'),
  verificationCode: z
    .string()
    .min(1, 'Verification code is required')
    .length(6, 'Verification code must be 6 characters'),
});

// Type exports
export type CreateEventInput = z.infer<typeof createEventSchema>;
export type UpdateEventInput = z.infer<typeof updateEventSchema>;
export type EventRegistrationInput = z.infer<typeof eventRegistrationSchema>;
export type UpdateParticipationStatusInput = z.infer<typeof updateParticipationStatusSchema>;
export type CreateResultInput = z.infer<typeof createResultSchema>;
export type VerifyCertificateInput = z.infer<typeof verifyCertificateSchema>;
