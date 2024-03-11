import {useEffect, useState} from "react";
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
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * A callback function to be called when the checkbox's state changes.
   */
  onChange: (value: boolean) => void;

  /**
   * If false - checkbox is disabled, if true - checkbox is not disabled
   * @default true
   */
  isEditable?: boolean;
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
    props.onChange(!isChecked);
  };

  useEffect(() => {
    setIsChecked(props.isDefaultChecked ?? false);
  }, [props.isDefaultChecked]);

  return (
    <label>
      <input
        className={clsx(props.className, styles.checkbox)}
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          props.isEditable !== false && handleCheckboxChange();
        }}
        data-cy={props.dataCy}
      />
    </label>
  );
};

