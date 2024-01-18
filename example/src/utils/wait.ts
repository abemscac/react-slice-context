/**
 * @param timeout Time to wait in milliseconds
 */
export const wait = (timeout: number): Promise<void> => {
  return new Promise((resolve) => {
    const timeoutId = setTimeout(() => {
      clearTimeout(timeoutId)
      return resolve()
    }, timeout)
  })
}
