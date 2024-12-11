export const REQUEST_TIME = 3000;

/**
 * Utils related to promises
 */
export class PromiseUtils {

  /**
   * Wait some time in ms
   */
  public static wait(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
