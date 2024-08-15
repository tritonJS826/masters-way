export type ValidatorValue = (value: string) => string | null;

/**
 * Validator checks if a value has a minimum length.
 */
export const minLengthValidator = (minLength: number, errorMessage: string): ValidatorValue => {
  return (value: string) => value.length < minLength ? errorMessage : null;
};

/**
 * Validator checks if a value has a maximum length.
 */
export const maxLengthValidator = (maxLength: number, errorMessage: string): ValidatorValue => {
  return (value: string) => value.length > maxLength ? errorMessage : null;
};
