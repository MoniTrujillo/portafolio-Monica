import type { AsyncDataRequestStatus } from '#app'

export const REQUEST_STATUS = {
  idle: 'idle',
  pending: 'pending',
  success: 'success',
  error: 'error',
} as const satisfies Record<AsyncDataRequestStatus, AsyncDataRequestStatus>

export function combineStatus(...statuses: AsyncDataRequestStatus[]): AsyncDataRequestStatus {
  if (statuses.includes(REQUEST_STATUS.error)) return REQUEST_STATUS.error
  if (statuses.every((status) => status === REQUEST_STATUS.success)) return REQUEST_STATUS.success
  return REQUEST_STATUS.pending
}
