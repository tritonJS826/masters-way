import clsx from "clsx";
import styles from "src/component/dropdown/DropdownMenuItem/DropdownMenuItem.module.scss";

/**
 * Option type for a select component
 */
export interface DropdownMenuItemType {

  /**
   * Item`s id. Should be unique
   */
  id: string;

  /**
   * Item`s value
   */
  value: string;

  /**
   * Item`s visible text
   */
  text: string;
}

/**
 * DropdownMenuItemProps props
 */
interface DropdownMenuItemProps {

  /**
   * Items`s value
   */
  value: string;

  /**
   * Inner option text
   */
  text: string;

  /**
   * Current value
   */
  currentValue: string;

  /**
   * Callback triggered onChange items's value
   */
  onChangeHandler: (value: string) => void;
}

/**
 * DropdownMenuItem component
 */
export const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  return (
    <li
      className={clsx(
        styles.dropdownMenuItem,
        styles[props.currentValue === props.value ? "dropdownMenuItemActive" : ""],
      )}
      onClick={() => props.onChangeHandler(props.value)}
    >
      {props.text}
    </li>
  );
};
