/**
 * Formatted date
 */
export class DateUtils {

  /**
   * Get formatted date in ISO format yyyy-mm-dd
   */
  public static getShortISODateValue(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

}