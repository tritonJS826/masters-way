const FIRST_CHAR = 1;

/**
 * Formatter utils
 */
export class FormatterUtils {

  /**
   * Checking for zero and formatting the value
   */
  public static defaultFormatter(value: string) {
    return value.startsWith("0") ? value.slice(FIRST_CHAR) : Number(value);
  }

}
