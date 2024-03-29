import React, {ReactNode} from "react";
import styles from "src/component/dropdown/dropdownMenuItem/DropdownMenuItem.module.scss";

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
  value: string | ReactNode;

  /**
   * Item`s onClick
   */
  onClick?: () => void;

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

  /**
   * Data attributes for cypress testing
   */
  dataCyContent?: string;
}

/**
 * DropdownMenuItem component
 */
export const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  return (
    <li
      key={props.value}
      className={styles.dropdownMenuItem}
      onClick={props.onClick ?? (() => {})}
      data-cy={props.dataCyContent}
    >
      {props.value}
    </li>
  );
};
