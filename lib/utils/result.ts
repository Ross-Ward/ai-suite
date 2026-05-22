/**
 * Result type — use instead of throwing for expected failures.
 *
 * @example
 * async function createCourse(input: CreateCourseInput): Promise<Result<Course>> {
 *   const existing = await courseRepo.findByTitle(input.title)
 *   if (existing) return err(new ConflictError('Course', 'title'))
 *   return ok(await courseRepo.create(input))
 * }
 *
 * const result = await createCourse(input)
 * if (!result.success) {
 *   // result.error is typed
 * }
 */
export type Result<T, E extends Error = Error> =
  | { success: true; data: T }
  | { success: false; error: E }

export const ok = <T>(data: T): Result<T, never> => ({ success: true, data })
export const err = <E extends Error>(error: E): Result<never, E> => ({ success: false, error })

/** Unwrap a Result, throwing if it failed */
export function unwrap<T>(result: Result<T>): T {
  if (!result.success) throw result.error
  return result.data
}
