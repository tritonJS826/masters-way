import {ValidatorValue} from "src/utils/validatorsValue/validators";

/**
 * Validation options
 */
interface ValidateOptions {

  /**
   * The value to be validated
   */
  value: string;

  /**
   * Array of validator functions to be applied to the value
   */
  validators: ValidatorValue[];
}

/**
 * Validate value
 */
export const validateValue = (options: ValidateOptions): string | null => {
  for (const validator of options.validators) {
    const errorText = validator(options.value);
    if (errorText) {
      return errorText;
    }
  }

  return null;
};
