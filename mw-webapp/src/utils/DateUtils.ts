const START_OF_ISO_SUBSTRING_RANGE = 0;
const END_OF_ISO_SUBSTRING_RANGE = 10;
export const DAY_MILLISECONDS = 86400000;
export const ONE_DAY = 1;
export const MINUTES_IN_HOUR = 60;
export const SECONDS_IN_MINUTE = 60;

/**
 * Used to calculate date properly without libs
 * Example:
 * mathematically time between three Date timestamps is equal 2 days.
 * but in application for 3 records we want to see 3 days
 */
export const SMALL_CORRECTION_MILLISECONDS = 1;

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
   * Format date to string yyyy.mm.dd
   */
  public static getShortISODotSplitted(date: Date): string {
    return DateUtils.getShortISODateValue(date).replaceAll("-", ".");
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
   * Compares two dates for ascending order
   */
  public static compareDatesASC(a: Date, b: Date) {
    return a.getTime() - b.getTime();
  }

  /**
   * Compares two dates for descending order
   */
  public static compareDatesDESC (a: Date, b: Date) {
    return b.getTime() - a.getTime();
  }

  /**
   * Conver minutes to hours with one digit after do
   */
  public static minutesToHoursFixed1(minutes: number): number {
    const PRECISION = 1;

    return Number((minutes / MINUTES_IN_HOUR).toFixed(PRECISION));
  }

  /**
   * Convert seconds to minutes with ceil rounding
   */
  public static getMinutesFromSeconds(seconds: number): number {
    return Math.ceil(seconds / SECONDS_IN_MINUTE);
  }

  /**
   * Convert minutes to seconds
   */
  public static getSecondsFromMinutes(minutes: number): number {
    return minutes * SECONDS_IN_MINUTE;
  }

}
