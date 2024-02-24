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
  public static getLastDate(amount: number, date?: Date): Date {
    const currentDate = date ?? new Date();
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
    const timeDifferenceInMilliseconds = Math.abs(endDate.getTime() - startDate.getTime());
    const daysAmountInRange = Math.ceil(timeDifferenceInMilliseconds / DAY_MILLISECONDS);
    const datesList = new Array(daysAmountInRange)
      .fill(null)
      .map((item, i) => {

        /**
         * TODO #573: Correction need because method getShortISODateValue return time in GMT format but we need UTC format
         */
        const correction = DAY_MILLISECONDS;

        return new Date(startDate.getTime() + (i * DAY_MILLISECONDS) + correction);
      });

    return datesList;
  }

}
