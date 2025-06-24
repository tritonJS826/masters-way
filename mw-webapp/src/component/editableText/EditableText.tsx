import {HTMLInputTypeAttribute, useState} from "react";
import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {getFormattedValue} from "src/component/editableText/getFormattedValue";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Input} from "src/component/input/Input";
import {Text} from "src/component/text/Text";
import {KeySymbols} from "src/utils/KeySymbols";
import {updateValueWithValidatorsHandler} from "src/utils/validatorsValue/updateValueWithValidatorsHandler";
import {ValidatorValue} from "src/utils/validatorsValue/validators";
import styles from "src/component/editableText/EditableText.module.scss";

/**
 * Data attributes for cypress testing
 */
interface CyEditableText {

  /**
   * Data attributes for cypress testing
   */
  trigger: string;

  /**
   * Data attributes for cypress testing
   */
  placeholder: string;

  /**
   * Data attributes for cypress testing
   */
  inputCy: string;
}

/**
 * Cell item props
 */
interface EditableTextProps<T> {

  /**
   * Cell item's value
   */
  value: T;

  /**
   * Function that update element on Enter click or unfocused
   */
  onChangeFinish: (value: T) => void;

  /**
   * Additional custom class name for the editable input
   */
  className?: string;

  /**
   * If false - doubleclick handler disabled, if true - doubleclick handler allowed
   * @default true
   */
  isEditable?: boolean;

  /**
   * Type of input
   * @default "text"
   */
  type?: HTMLInputTypeAttribute;

  /**
   * Maximum value for input type "number"
   */
  max?: number;

  /**
   * Minimum value for input type "number"
   */
  min?: number;

  /**
   * Data attributes for cypress testing
   */
  cy?: CyEditableText;

  /**
   * Placeholder
   */
  placeholder: string;

  /**
   * Array of validator functions to be applied to the value
   */
  validators?: ValidatorValue[];

  /**
   * If true - edit button icon will add, if false - not
   * @default false
   */
  isEditIconExist?: boolean;
}

/**
 * Render Input or span depend on client actions
 */
export const EditableText = <T extends string | number>(props: EditableTextProps<T>) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(props.value);

  const isEmptyText = value.toString().trim() === "";
  const isEditButtonVisible = props.isEditable && !isEditing;

  /**
   * HandleChangeFinish
   */
  const handleChangeFinish = () => {
    props.onChangeFinish(value);
    setIsEditing(false);
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {
      handleChangeFinish();
    }
  };

  /**
   * Update value
   */
  const updateValue = (updatedValue: T) => {
    updateValueWithValidatorsHandler({
      updatedValue,
      validators: props.validators,
      setValue,
    });
  };

  /**
   * Render input
   */
  const renderInput = () => (
    <HorizontalContainer className={styles.inputContainer}>
      <Input
        dataCy={props.cy?.inputCy}
        placeholder={props.cy?.placeholder ?? ""}
        formatter={getFormattedValue}
        type={props.type ?? "text"}
        max={props.max}
        min={props.min}
        value={value}
        autoFocus={true}
        onChange={updateValue}
      />
      <Button
        icon={
          <Icon
            size={IconSize.SMALL}
            name="CheckIcon"
          />
        }
        onClick={handleChangeFinish}
        buttonType={ButtonType.ICON_BUTTON}
        className={styles.editButton}
      />
    </HorizontalContainer>
  );

  return (
    <div
      onDoubleClick={() => {
        props.isEditable !== false && setIsEditing(true);
      }}
      onBlur={handleChangeFinish}
      onKeyDown={handleEnter}
      className={clsx(styles.editableText, props.className)}
      role="trigger"
      data-cy={props.cy?.trigger}
    >
      {isEditing
        ? renderInput()
        : <Text text={isEmptyText ? props.placeholder : value} />
      }
      {props.isEditIconExist && isEditButtonVisible && (
        <div className={styles.editButton}>
          <Button
            icon={
              <Icon
                size={IconSize.SMALL}
                name="PenToolIcon"
              />
            }
            onClick={() => {
              setIsEditing(true);
            }}
            buttonType={ButtonType.ICON_BUTTON}
          />
        </div>
      )}
    </div>
  );
};
