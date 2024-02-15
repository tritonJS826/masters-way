/**
 * Parsers
 */
export class ParserInputValue {

  /**
   * Default text parser
   */
  public static defaultTextParser<T = string>(value: string): T {
    return value as T;
  }

  /**
   * Default number parser
   */
  public static defaultNumberParser<T = number>(value: string): T {
    return Number(value) as T;
  }

}
