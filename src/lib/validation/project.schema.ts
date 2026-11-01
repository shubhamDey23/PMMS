import { z } from 'zod'
import { translations, type Language } from '@/lib/i18n/translations'

export function createProjectSchema(lang: Language = 'en') {
  const err = translations[lang].form.errors

  return z
    .object({
      nameEn: z
        .string()
        .trim()
        .min(3, { message: err.nameEnMin })
        .max(200, { message: 'Max 200 characters allowed' }),
      nameHi: z.string().trim().max(200).optional().or(z.literal('')),
      descriptionEn: z
        .string()
        .trim()
        .min(10, { message: err.descEnMin }),
      descriptionHi: z.string().trim().optional().or(z.literal('')),
      category: z.string().min(1, { message: err.categoryRequired }),
      type: z.string().optional().or(z.literal('')),
      financialYear: z.string().min(1, { message: 'Financial year is required' }),
      department: z.string().min(1, { message: err.departmentRequired }),
      responsibleOfficer: z.string().trim().optional().or(z.literal('')),
      contractor: z.string().trim().optional().or(z.literal('')),

      state: z.string().trim().optional().or(z.literal('')),
      district: z.string().trim().min(1, { message: err.districtRequired }),
      block: z.string().trim().optional().or(z.literal('')),
      panchayat: z.string().trim().optional().or(z.literal('')),
      village: z.string().trim().optional().or(z.literal('')),
      address: z.string().trim().optional().or(z.literal('')),

      latitude: z
        .union([z.number(), z.string()])
        .optional()
        .transform((val) => (val === '' || val === undefined ? undefined : Number(val)))
        .refine((val) => val === undefined || (val >= -90 && val <= 90), {
          message: err.latitudeRange,
        }),

      longitude: z
        .union([z.number(), z.string()])
        .optional()
        .transform((val) => (val === '' || val === undefined ? undefined : Number(val)))
        .refine((val) => val === undefined || (val >= -180 && val <= 180), {
          message: err.longitudeRange,
        }),

      estimatedCost: z
        .union([z.number(), z.string()])
        .transform((val) => (val === '' || val === undefined ? NaN : Number(val)))
        .refine((val) => !isNaN(val) && val > 0, {
          message: err.estimatedCostPositive,
        }),

      approvedAmount: z
        .union([z.number(), z.string()])
        .optional()
        .transform((val) => (val === '' || val === undefined ? undefined : Number(val)))
        .refine((val) => val === undefined || val >= 0, {
          message: err.approvedPositive,
        }),

      agreementAmount: z
        .union([z.number(), z.string()])
        .optional()
        .transform((val) => (val === '' || val === undefined ? undefined : Number(val)))
        .refine((val) => val === undefined || val >= 0, {
          message: err.agreementPositive,
        }),

      amountReleased: z
        .union([z.number(), z.string()])
        .optional()
        .transform((val) => (val === '' || val === undefined ? undefined : Number(val)))
        .refine((val) => val === undefined || val >= 0, {
          message: 'Amount released cannot be negative',
        }),

      expenditure: z
        .union([z.number(), z.string()])
        .optional()
        .transform((val) => (val === '' || val === undefined ? undefined : Number(val)))
        .refine((val) => val === undefined || val >= 0, {
          message: err.expenditurePositive,
        }),

      approvalDate: z.string().optional().or(z.literal('')),
      plannedStartDate: z.string().optional().or(z.literal('')),
      plannedCompletionDate: z.string().optional().or(z.literal('')),
      actualStartDate: z.string().optional().or(z.literal('')),
      actualCompletionDate: z.string().optional().or(z.literal('')),

      physicalProgress: z
        .union([z.number(), z.string()])
        .optional()
        .transform((val) => (val === '' || val === undefined ? 0 : Number(val)))
        .refine((val) => val >= 0 && val <= 100, {
          message: 'Physical progress must be between 0 and 100',
        }),

      financialProgress: z
        .union([z.number(), z.string()])
        .optional()
        .transform((val) => (val === '' || val === undefined ? 0 : Number(val)))
        .refine((val) => val >= 0 && val <= 100, {
          message: 'Financial progress must be between 0 and 100',
        }),

      stage: z.string().optional().default('Recommendation'),
      status: z.enum(['Ongoing', 'Completed', 'Pending', 'Delayed']).optional().default('Pending'),
      priority: z.enum(['Critical', 'High', 'Medium', 'Low']).optional().default('Medium'),
      remarks: z.string().trim().optional().or(z.literal('')),
    })
    .superRefine((data, ctx) => {
      // 1. Coordinates completeness check
      const hasLat = data.latitude !== undefined && !isNaN(data.latitude)
      const hasLng = data.longitude !== undefined && !isNaN(data.longitude)
      if ((hasLat && !hasLng) || (!hasLat && hasLng)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: err.coordsIncomplete,
          path: hasLat ? ['longitude'] : ['latitude'],
        })
      }

      // 2. Timeline sequence check
      if (data.plannedStartDate && data.plannedCompletionDate) {
        const start = new Date(data.plannedStartDate).getTime()
        const end = new Date(data.plannedCompletionDate).getTime()
        if (!isNaN(start) && !isNaN(end) && end < start) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: err.plannedCompletionBeforeStart,
            path: ['plannedCompletionDate'],
          })
        }
      }

      // 3. Financial logic check
      if (
        data.approvedAmount !== undefined &&
        data.estimatedCost !== undefined &&
        data.approvedAmount > data.estimatedCost
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: err.approvedExceedsEstimated,
          path: ['approvedAmount'],
        })
      }

      if (
        data.expenditure !== undefined &&
        data.approvedAmount !== undefined &&
        data.expenditure > data.approvedAmount
      ) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: err.expenditureExceedsApproved,
          path: ['expenditure'],
        })
      }
    })
}

export type ProjectFormData = z.infer<ReturnType<typeof createProjectSchema>>
