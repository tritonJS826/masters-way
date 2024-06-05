const START_OF_ISO_SUBSTRING_RANGE = 0;
const END_OF_ISO_SUBSTRING_RANGE = 10;
const DAY_MILLISECONDS = 86400000;
const ONE_DAY = 1;

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
  public static getDatesBetween(startDate: Date, endDate: Date): string[] {
    const dates: string[] = [];

    /**
     *GetISODate
     */
    const getISODate = (date: Date) => date.toISOString().split("T")[0];

    const isoStartDate = getISODate(startDate);
    const isoEndDate = getISODate(endDate);

    const currentDate = new Date(isoStartDate);
    const lastDate = new Date(isoEndDate);

    lastDate.setDate(lastDate.getDate() + ONE_DAY);

    while (currentDate < lastDate) {
      dates.push(getISODate(currentDate));
      currentDate.setDate(currentDate.getDate() + ONE_DAY);
    }

    return [...new Set(dates)];
  }

  /**
   * Dates ascendant sorter
   */
  public static datesASCSorter(a: Date, b: Date) {
    return a.getTime() - b.getTime();
  }

}
