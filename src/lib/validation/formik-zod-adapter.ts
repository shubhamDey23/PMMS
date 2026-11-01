import { type ZodType, type ZodIssue } from 'zod'

export function formikZodAdapter<T>(schema: ZodType<T>) {
  return (values: unknown) => {
    const result = schema.safeParse(values)

    if (result.success) {
      return {}
    }

    const errors: Record<string, string> = {}

    result.error.issues.forEach((issue: ZodIssue) => {
      const fieldPath = issue.path.join('.')
      if (!errors[fieldPath]) {
        errors[fieldPath] = issue.message
      }
    })

    return errors
  }
}

