const START_OF_ISO_SUBSTRING_RANGE = 0;
const END_OF_ISO_SUBSTRING_RANGE = 10;
const DATE_FROM_ISO_SUBSTRING_RANGE: [number, number] = [START_OF_ISO_SUBSTRING_RANGE, END_OF_ISO_SUBSTRING_RANGE];

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
      .substring(...DATE_FROM_ISO_SUBSTRING_RANGE);
  }

}