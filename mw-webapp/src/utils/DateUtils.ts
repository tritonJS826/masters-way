const START_OF_ISO_SUBSTRING_RANGE = 0;
const END_OF_ISO_SUBSTRING_RANGE = 10;
const DAY_MILLISECONDS = 86400000;

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
  
    const isoStartDate = startDate.toISOString().split('T')[0];
    const isoEndDate = endDate.toISOString().split('T')[0];

    let currentDate = new Date(isoStartDate);
    const lastDate = new Date(isoEndDate);
  
    lastDate.setDate(lastDate.getDate() + 1);
  
    while (currentDate < lastDate) {
      dates.push(currentDate.toISOString().split('T')[0]);
      currentDate.setDate(currentDate.getDate() + 1);
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
