import styles from "src/component/dropdown/DropdownMenuItem/DropdownMenuItem.module.scss";

/**
 * DropdownMenuItem types
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
   * Item`s onClick
   */
  onClick: () => void;

  /**
   * Item`s visible state
   * @default true
   */
  isVisible?: boolean;
}

/**
 * DropdownMenuItem props
 */
interface DropdownMenuItemProps {

  /**
   * Items`s value
   */
  value: string;

  /**
   * Callback triggered onClick
   */
  onClick: () => void;
}

/**
 * DropdownMenuItem component
 */
export const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  return (
    <li
      className={styles.dropdownMenuItem}
      onClick={props.onClick}
    >
      {props.value}
    </li>
  );
};
