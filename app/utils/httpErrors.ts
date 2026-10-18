export const HTTP_STATUS = {
  forbidden: 403,
  notFound: 404,
} as const

export const errorKeyFor = (
  statusCode: number | undefined,
  keys: Partial<Record<number, string>>,
  fallback: string,
) => (statusCode && keys[statusCode]) || fallback
