import { z } from 'zod'

export const parseApiResponse = <TSchema extends z.ZodTypeAny>(
  schema: TSchema,
  data: unknown
): z.infer<TSchema> => {
  return schema.parse(data)
}