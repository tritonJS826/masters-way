const START_DATE_RANGE_SYMBOL = 0;
const END_DATE_RANGE_SYMBOL = 10;
const START_OF_DATE_SYMBOL_RANGE = 0;
const END_OF_DATE_SYMBOL_RANGE = 1;
const DATE_SYMBOL_RANGE: [number, number] = [START_DATE_RANGE_SYMBOL, END_DATE_RANGE_SYMBOL];

/**
 * Formatted date
 */
export class DateUtils {

  /**
   * Format date to string yyyy-mm-dd
   */
  public static getShortISODateValue(date: Date): string {
    return date.toISOString().slice(DATE_SYMBOL_RANGE[START_OF_DATE_SYMBOL_RANGE], DATE_SYMBOL_RANGE[END_OF_DATE_SYMBOL_RANGE]);
  }

}