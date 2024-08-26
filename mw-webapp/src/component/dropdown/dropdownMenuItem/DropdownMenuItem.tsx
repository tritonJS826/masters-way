import {ReactElement} from "react";
import {Item} from "@radix-ui/react-dropdown-menu";
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
  value: ReactElement<HTMLElement> | string;

  /**
   * Item`s onClick
   */
  onClick?: () => void;

  /**
   * Item`s visible state
   * @default true
   */
  isVisible?: boolean;

  /**
   * If true then dropdown will not close automatically after choose the item. Need for don't conflict with opening modals
   * @default false
   */
  isPreventDefaultUsed: boolean;

}

/**
 * DropdownMenuItem props
 */
interface DropdownMenuItemProps {

  /**
   * Items`s value
   */
  value: ReactElement<HTMLElement> | string;

  /**
   * Callback triggered onClick
   */
  onClick: () => void;

  /**
   * Data attributes for cypress testing
   */
  dataCyContent?: string;

  /**
   * If true then onSelect will prevent default behavior
   * @default false
   */
  isPreventDefaultUsed: boolean;

}

/**
 * DropdownMenuItem component
 */
export const DropdownMenuItem = (props: DropdownMenuItemProps) => {
  return (
    <Item
      className={styles.dropdownMenuItem}
      onClick={props.onClick ?? (() => { })}
      onSelect={(event) => props.isPreventDefaultUsed && event.preventDefault()}
      data-cy={props.dataCyContent}
    >
      {props.value}
    </Item>
  );
};
