const LAST_ARRAY_ELEMENT = -1;

/**
 * Get last element from an array
 */
export const getLastElementFromArray = <T>(array: T[]): T => {
  const lastElement = array.at(LAST_ARRAY_ELEMENT);
  if (!lastElement) {
    throw new Error("The array was empty");
  }

  return lastElement;
};
