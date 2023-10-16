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
   * Indicates whether the checkbox is checked.
   */
  checked: boolean;

  /**
   * A callback function to be called when the checkbox's state changes.
   */
  onChange: () => void;
}

/**
 * Checkbox component
 */
export const Checkbox = (props: CheckboxProps) => {
  return (
    <input
      className={clsx(styles.checkbox, props.className)}
      type="checkbox"
      checked={props.checked}
      onChange={props.onChange}
    />
  );
};
