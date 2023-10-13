import {Indicator, Root} from "@radix-ui/react-checkbox";
import {CheckIcon} from "@radix-ui/react-icons";
import clsx from "clsx";
import styles from "src/component/checkbox/Сheckbox.module.scss";

/**
 * Checkbox props
 */
interface CheckboxProps {

  /**
   * Custom class for the checkbox.
   */
  className?: string;

  /**
   * Unique identifier for the checkbox.
   */
  id: string;

  /**
   * Content for the label.
   */
  label: string;

  /**
   * The name of the checkbox.
   */
  name?: string;

  /**
   * The value of the checkbox.
   * @default "on"
   */
  value?: string;

  /**
   * The checked state of the checkbox when it is initially rendered.
   * @default false
   */
  defaultChecked?: boolean;

  /**
   * When true, prevents the user from interacting with the checkbox.
   * @default false
   */
  disabled?: boolean;

  /**
   * The required property a checkbox must be checked before submitting a form.
   * @default false
   */
  required?: boolean;
}

/**
 * Checkbox component
 */
export const Checkbox = (props: CheckboxProps) => {
  return (
    <div className={clsx(styles.checkboxContainer, props.className)}>
      <Root
        className={styles.checkboxRoot}
        id={props.id}
        name={props.name}
        value={props.value}
        defaultChecked={props.defaultChecked}
        disabled={props.disabled}
        required={props.required}
      >
        <Indicator className={styles.checkboxIndicator}>
          <CheckIcon />
        </Indicator>
      </Root>
      <label
        className={clsx(styles.label, props.disabled && styles.disabled)}
        htmlFor={props.id}
      >
        {props.label}
      </label>
    </div>
  );
};
