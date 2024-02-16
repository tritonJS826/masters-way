/**
 * Formatters
 */
export class FormatterInputValue {

  /**
   * Delete first zero from input number
   */
  public static withNoFirstZero(value: number) {
    return String(value);
  }

  /**
   * Default string formatter
   */
  public static defaultStringFormatter(value: string) {
    return value;
  }

}

