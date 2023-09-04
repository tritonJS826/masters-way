/**
 * Formatted date
 */
export class DateValue {

  /**
   * Get formatted date in ISO format yyyy-mm-dd
   */
  public static getFormattedDateValue(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

}