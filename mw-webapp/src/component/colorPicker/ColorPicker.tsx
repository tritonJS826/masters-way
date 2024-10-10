import styles from "src/component/colorPicker/ColorPicker.module.scss";

/**
 * Color picker props
 */
interface ColorPickerProps {

  /**
   * Color picker's color value
   */
  color: string;

  /**
   * Callback triggered on input change
   */
  onChange: (updatedColor: string) => void;

}

/**
 * Color picker component
 */
export const ColorPicker = (props: ColorPickerProps) => {
  return (
    <input
      className={styles.colorPickerInput}
      type="color"
      value={props.color}
      onChange={(event) => props.onChange(event.target.value)}
    />
  );
};
