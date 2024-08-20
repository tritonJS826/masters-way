import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {validateValue} from "src/utils/validatorsValue/validateValue";
import {ValidatorValue} from "src/utils/validatorsValue/validators";

/**
 * UpdateValueWithValidatorsHandlerProps
 */
interface UpdateValueWithValidatorsHandlerProps<T> {

  /**
   * Updated value
   */
  updatedValue: T;

  /**
   * Array of validator functions to be applied to the value
   */
  validators?: ValidatorValue[];

  /**
   * Set new value
   */
  setValue: (value: T) => void;

}

/**
 * UpdateValueWithValidatorsHandler
 */
export const updateValueWithValidatorsHandler = <T extends string | number>({
  updatedValue,
  validators,
  setValue,
}: UpdateValueWithValidatorsHandlerProps<T>) => {
  if (!validators) {
    setValue(updatedValue);

    return;
  }

  const error = validateValue({value: updatedValue, validators});
  if (error) {
    displayNotification({
      text: error,
      type: NotificationType.INFO,
    });
  } else {
    setValue(updatedValue);
  }
};
