const FIRST_INDEX = 0;
const LAST_INDEX = 10;

/**
 * Formatted date
 */
export class DateUtils {

  /**
   * Format date to string yyyy-mm-dd
   */
  public static getShortISODateValue(date: Date): string {
    return date.toISOString().slice(FIRST_INDEX, LAST_INDEX);
  }

}