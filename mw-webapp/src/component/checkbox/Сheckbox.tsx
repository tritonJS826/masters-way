import {useState} from "react";
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
   * Indicates whether the checkbox is checked by default.
   * @default false
   */
  isDefaultChecked?: boolean;

  /**
   * A callback function to be called when the checkbox's state changes.
   */
  onChange: (value: boolean) => void;
}

/**
 * Checkbox component
 */
export const Checkbox = (props: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(props.isDefaultChecked ?? false);

  /**
   * Function to handle checkbox change
   */
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
    props.onChange;
  };

  return (
    <input
      className={clsx(styles.checkbox, props.className)}
      type="checkbox"
      checked={isChecked}
      onChange={handleCheckboxChange}
    />
  );
};
