import {FormatterInputValue} from "src/component/input/formatters";

/**
 * Get formatted value
 */
export const getFormattedValue = <T extends string | number>(incomingValue: T) => {
  return typeof incomingValue === "number"
    ? FormatterInputValue.withNoFirstZero(incomingValue)
    : FormatterInputValue.defaultStringFormatter(incomingValue);
};
