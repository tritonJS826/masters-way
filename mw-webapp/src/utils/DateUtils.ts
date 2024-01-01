const START_OF_ISO_SUBSTRING_RANGE = 0;
const END_OF_ISO_SUBSTRING_RANGE = 10;

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
   * Get array with last {@link amount} dates
   */
  public static getLastDates(amount: number): string[] {
    const lastDates = [...Array(amount)].map((elem, index) => {
      const currentDate = new Date();
      const date = currentDate.setDate(currentDate.getDate() - index);
      const formattedDate = DateUtils.getShortISODateValue(new Date(date));

      return formattedDate;
    });

    return lastDates;
  }

}
