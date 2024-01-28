/**
 * Show error
 */
export const showError = (key: string) => {
  throw new Error(`Field ${key} doesn't exist`);
};
