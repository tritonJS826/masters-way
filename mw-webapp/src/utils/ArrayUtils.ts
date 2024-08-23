
/**
 * Array utils
 */
export class ArrayUtils {

  /**
   * Get difference between two arrays by some field
   */
  public static getDifference<T extends unknown[]>(arr1: T, arr2: T) {
    return arr1.filter(x => !arr2.includes(x));
  }

  /**
   * Remove duplicates from the array by some field (check just field)
   */
  public static removeDuplicatesByField<T>(items: T[], field: keyof T): T[] {
    // Create a Set to store unique field values
    const seen = new Set<T[keyof T]>();

    // Filter the array, adding items to the result if the field value is not already in the Set
    const uniqueItems = items.filter(item => {
      const value = item[field];
      if (!seen.has(value)) {
        seen.add(value);

        return true;
      }

      return false;
    });

    return uniqueItems;
  }

}
