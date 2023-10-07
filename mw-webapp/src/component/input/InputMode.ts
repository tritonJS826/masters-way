/**
 * Input's modes for virtual keyboard
 */
export enum InputMode {

  /**
   * Without virtual keyboard
   */
  none = "none",

  /**
   * Text keyboard
   */
  text = "text",

  /**
   * A telephone keyboard, include the digits 0–9, the asterisk (*), and the pound (#) key
   */
  tel = "tel",

  /**
   * A keyboard for URLs, may have the "/" key
   */
  url = "url",

  /**
   * A keyboard for emails. Includes the "@"
   */
  email = "email",

  /**
   * Numeric keyboard requires the digits 0–9
   */
  numeric = "numeric",

  /**
   * Numeric keyboard containing the digits and decimal separator (".", ",")
   */
  decimal = "decimal",

  /**
   * A virtual keyboard optimized for search input
   */
  search = "search",
}
