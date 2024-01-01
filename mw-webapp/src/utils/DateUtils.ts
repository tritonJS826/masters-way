const START_OF_ISO_SUBSTRING_RANGE = 0;
const END_OF_ISO_SUBSTRING_RANGE = 10;
const DAY_MILLISECONDS = 86400000;

/**
 * Formatted date
 */
export class DateUtils {

  /**
   * Format date to string yyyy-mm-dd
   */
  public static getShortISODateValue(date: Date): string {
    return date
      .toISOString()
      .substring(START_OF_ISO_SUBSTRING_RANGE, END_OF_ISO_SUBSTRING_RANGE);
  }

  /**
   * Date that was {@link amount} days ago
   */
  public static getLastDate(amount: number): Date {
    const currentDate = new Date();
    const dateInPast = new Date(currentDate.getTime() - (amount * DAY_MILLISECONDS));

    return new Date(dateInPast);
  }

}
