
/**
 * ValidateOptions
 */
interface ValidateOptions {

  /**
   * Minimum length of the value
   */
  minLength?: number;

  /**
   * Maximum length of the value
   */
  maxLength?: number;

  /**
   * Notification text for minimum length text
   */
  notificationMinLengthText?: string;

  /**
   * Notification text for maximum length text
   */
  notificationMaxLengthText?: string;
}

/**
 * ValidateResult
 */
interface ValidateResult {

  /**
   * Indicates if the text length is invalid
   */
  isInvalidTextLength: boolean;

  /**
   * Notification text based on the validation result
   */
  notificationText?: string;
}

/**
 * GetValidValue
 */
export const getValidValue = (
  value: string | number,
  options: ValidateOptions,
): ValidateResult => {

  const isExceedingMinLength = typeof value === "string" &&
    options.minLength && value.length < options.minLength;

  const isExceedingMaxLength = typeof value === "string" &&
    options.maxLength && value.length > options.maxLength;

  const isInvalidTextLength = isExceedingMinLength || isExceedingMaxLength || false;

  const notificationText = isExceedingMinLength
    ? options.notificationMinLengthText
    : options.notificationMaxLengthText;

  return {isInvalidTextLength, notificationText};
};
