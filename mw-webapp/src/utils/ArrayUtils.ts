
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

}
