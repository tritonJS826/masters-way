import styles from "src/component/checkbox/Checkbox.module.scss";

/**
 * Checkbox props
 */
interface CheckboxProps {
  /**
   * Checkbox status
   */
  checked: boolean;
  /**
   * Label's text
   */
  label: string;
  /**
   * Checkbox`s value
   */
  value?: string;
  /**
   * Checkbox's name
   */
  name?: string;
  /**
   * The flag sets the element to be required
   */
  required?: boolean;
  /**
   * Callback triggered on change checkbox
   */
  onChange: () => void;
}

/**
 * Checkbox component
 */
export const Checkbox: React.FC<CheckboxProps> = (props : CheckboxProps) => {
  return (
    <label className={styles.checkbox}>
      <input
        type="checkbox"
        checked={props.checked}
        onChange={props.onChange}
        value={props.value}
        name={props.name}
        required={props.required}
      />
      {props.label}
    </label>
  );
};
