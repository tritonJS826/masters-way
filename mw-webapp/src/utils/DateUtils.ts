const FIRST_INDEX = 0;
const SECOND_INDEX = 1;
const START_RANGE = 0;
const END_RANGE = 10;
const SHORT_DATE_FROM_ISOSTRING_RANGE: [number, number] = [START_RANGE, END_RANGE];

/**
 * Formatted date
 */
export class DateUtils {

  /**
   * Format date to string yyyy-mm-dd
   */
  public static getShortISODateValue(date: Date): string {
    return date.toISOString().slice(SHORT_DATE_FROM_ISOSTRING_RANGE[FIRST_INDEX], SHORT_DATE_FROM_ISOSTRING_RANGE[SECOND_INDEX]);
  }

}