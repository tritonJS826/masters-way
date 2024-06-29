const START_OF_ISO_SUBSTRING_RANGE = 0;
const END_OF_ISO_SUBSTRING_RANGE = 10;
const DAY_MILLISECONDS = 86400000;
const ONE_DAY = 1;
export const MINUTES_IN_HOUR = 60;

/**
 * Type for sortDates generic
 */
export type DatedObject = {

  /**
   * Property with Date type
   */
  [key: string]: Date;
}

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
  public static getLastDate(amount: number, date?: Date): Date {
    const currentDate = date ?? new Date();
    const dateInPast = new Date(currentDate.getTime() - (amount * DAY_MILLISECONDS));

    return dateInPast;
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

    const isoStartDate = DateUtils.getShortISODateValue(startDate);
    const isoEndDate = DateUtils.getShortISODateValue(endDate);

    const currentDate = new Date(isoStartDate);
    const lastDate = new Date(isoEndDate);

    const daysCount = ((lastDate.getTime() - currentDate.getTime()) / DAY_MILLISECONDS) + ONE_DAY;

    const datesList = new Array(daysCount)
      .fill(null)
      .map((_, i) => new Date(currentDate.getTime() + (i * DAY_MILLISECONDS)));

    return datesList;
  }

  /**
   * Dates ascendant sorter
   */
  public static datesASCSorter(a: Date, b: Date) {
    return a.getTime() - b.getTime();
  }

}
