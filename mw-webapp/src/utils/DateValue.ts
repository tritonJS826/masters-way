/**
 * Date in ISO format yyyy-mm-dd
 */
export class DateValue {

  /**
   * Get formatted date
   */
  public static getFormattedDateValue(date: Date): string {
    return date.toISOString().slice(0, 10);
  }

}