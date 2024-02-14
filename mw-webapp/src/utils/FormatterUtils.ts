const SECOND_INDEX = 1;

/**
 * Formatter utils
 */
export class FormatterInputValue {

  /**
   * Checking for zero and formatting the value
   */
  public static defaultFormatter(value: string | number) {
    return typeof value === "string" && value.startsWith("0") ? value.slice(SECOND_INDEX) : value;
  }

}
