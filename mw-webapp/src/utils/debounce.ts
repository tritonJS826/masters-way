/**
 * Creates a debounced version of the provided function, which delays its execution until after a specified wait time.
 * This is particularly useful for limiting the rate at which a function is called, such as for handling input events.
 *
 * looks like it does not work properly, double check when use
 * @deprecated
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function debounce(func: (...args: any[]) => any, wait: number) {
  let timeout: ReturnType<typeof setTimeout>;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function executedFunction(...args: any[]) {

    /**
     * To call later
     */
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
