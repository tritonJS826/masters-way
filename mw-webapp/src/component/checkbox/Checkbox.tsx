import {useState} from "react";
import clsx from "clsx";
import styles from "src/component/checkbox/Checkbox.module.scss";

/**
 * Checkbox props
 * {@link Checkbox}
 */
interface CheckboxProps {
  /**
   * Label's text
   */
  label: string;
  /**
   * Default checkbox status
   * @default false
   */
  isDefaultChecked?: boolean;
  /**
   * Checkbox`s value
   */
  value?: string;
  /**
   * Checkbox's name
   */
  name?: string;
  /**
   * The checkbox must be filled out if true
   */
  required?: boolean;
  /**
   * Checkbox's class
   */
  className?: string | string[];
}

/**
 * Checkbox component
 */
export const Checkbox = (props : CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(!!props.isDefaultChecked);

  return (
    <label className={clsx(styles.checkbox, props.className)}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={() => setIsChecked((prev) => !prev)}
        value={props.value}
        name={props.name}
        required={props.required}
      />
      {props.label}
    </label>
  );
};
