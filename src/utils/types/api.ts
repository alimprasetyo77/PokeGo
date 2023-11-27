/* eslint-disable @typescript-eslint/no-explicit-any */
export type Response<T = any> = {
  count: number,
  next: string | null,
  previous: string | null,
  results: T
}