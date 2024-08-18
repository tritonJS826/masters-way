export type ValidatorValue = (value: string | number) => string | null;

/**
 * Validator checks if a value has a minimum length.
 */
export const minLengthValidator = (minLength: number, errorMessage: string): ValidatorValue => {
  return (value: string | number) => {
    const strValue = value.toString();

    return strValue.length < minLength ? errorMessage : null;
  };
};

/**
 * Validator checks if a value has a maximum length.
 */
export const maxLengthValidator = (maxLength: number, errorMessage: string): ValidatorValue => {
  return (value: string | number) => {
    const strValue = value.toString();

    return strValue.length > maxLength ? errorMessage : null;
  };
};

/**
 * Validator checks if a value has a minimum value.
 */
export const minValueValidator = (minValue: number, errorMessage: string): ValidatorValue => {
  return (value: string | number) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    return !isNaN(numValue) && numValue < minValue ? errorMessage : null;
  };
};

/**
 * Validator checks if a value has a maximum value.
 */
export const manValueValidator = (maxValue: number, errorMessage: string): ValidatorValue => {
  return (value: string | number) => {
    const numValue = typeof value === "string" ? parseFloat(value) : value;

    return !isNaN(numValue) && numValue > maxValue ? errorMessage : null;
  };
};
