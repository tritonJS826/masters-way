import {useEffect, useState} from "react";
import clsx from "clsx";
import styles from "src/component/toggle/Toggle.module.scss";

/**
 * Toggle props
 */
interface ToggleProps {

  /**
   * Custom class
   */
  className?: string;

  /**
   * Is checked by default.
   * @default false
   */
  isDefaultChecked?: boolean;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * A callback function to be called when the toggle's state changes.
   */
  onChange: (value: boolean) => void;

  /**
   * If true - toggle is disabled, if false - not disabled
   * @default false
   */
  isDisabled?: boolean;
}

/**
 * Toggle component
 */
export const Toggle = (props: ToggleProps) => {
  const [isChecked, setIsChecked] = useState<boolean>(props.isDefaultChecked ?? false);

  /**
   * Function to handle toggle change
   */
  const handleToggleChange = () => {
    setIsChecked(!isChecked);
    props.onChange(!isChecked);
  };

  useEffect(() => {
    setIsChecked(props.isDefaultChecked ?? false);
  }, [props.isDefaultChecked]);

  return (
    <label className={clsx(styles.switch, props.isDisabled && styles.disabled)}>
      <input
        className={clsx(styles.toggle, props.className)}
        type="checkbox"
        checked={isChecked}
        disabled={props.isDisabled}
        onChange={() => {
          props.isDisabled !== false && handleToggleChange();
        }}
        data-cy={props.dataCy}
      />
      <span className={styles.slider} />
    </label>
  );
};

