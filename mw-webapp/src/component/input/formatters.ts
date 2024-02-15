/**
 * Formatters
 */
export class FormatterInputValue {

  /**
   * Delete first zero from input number
   */
  public static withNoFirstZero(value: string | number) {
    const SECOND_INDEX = 1;
    const valueStringified = value.toString();

    const formattedValue = typeof value === "number" && valueStringified.startsWith("0")
      ? valueStringified.slice(SECOND_INDEX)
      : value;

    return formattedValue;
  }

}

