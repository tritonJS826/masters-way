const START_OF_ISO_SUBSTRING_RANGE = 0;
const END_OF_ISO_SUBSTRING_RANGE = 10;
const DAY_MILLISECONDS = 86400000;
const ITERABLE_STEP = 1;

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

    return new Date(dateInPast.toDateString());
  }

  /**
   * Round a Date object to the year of the month and day
   */
  public static roundToDate(date: Date): Date {
    return new Date (date.toDateString());
  }

  /**
   * Get dates between two dates
   */
  public static getDatesBetween(startDate: Date, endDate: Date): Date[] {
    const dates = [];

    const currentDate = new Date(startDate.getTime());

    while (currentDate <= endDate) {
      dates.push(new Date(currentDate.getTime()));
      currentDate.setDate(currentDate.getDate() + ITERABLE_STEP);
    }

    return dates;
  }

}
