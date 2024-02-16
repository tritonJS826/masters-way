/**
 * Formatters
 */
export class FormatterInputValue {

  /**
   * Delete first zero from input number
   */
  public static withNoFirstZero(value: number) {
    const SECOND_INDEX = 1;
    const valueStringified = value.toString();

    const formattedValue = valueStringified.startsWith("0")
      ? valueStringified.slice(SECOND_INDEX)
      : value;

    return formattedValue;
  }

  /**
   * Default string formatter
   */
  public static defaultStringFormatter(value: string) {
    return value;
  }

}

