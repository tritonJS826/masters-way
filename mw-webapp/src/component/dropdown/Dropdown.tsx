import {ReactElement, useRef, useState} from "react";
import {DropdownMenuItem, DropdownMenuItemType} from "src/component/dropdown/dropdownMenuItem/DropdownMenuItem";
import {useClickOutside} from "src/hooks/useClickOutside";
import styles from "src/component/dropdown/Dropdown.module.scss";

/**
 * Dropdown props
 */
export interface DropdownProps {

  /**
   * The element that triggers the Dropdown.
   */
  trigger: ReactElement<HTMLElement>;

  /**
   * Dropdown`s current value
   */
  value: string;

  /**
   * DropdownMenuItems list
   */
  dropdownMenuItems: DropdownMenuItemType[];

  /**
   * Callback triggered onChange item
   */
  onChange: (value: string) => void;
}

/**
 * Dropdown conponent
 */
export const Dropdown = (props: DropdownProps) => {
  const [isOpen, setIsOpenMenu] = useState(false);
  const refMenu = useRef<HTMLUListElement>(null);

  useClickOutside(refMenu, () => setIsOpenMenu(false));

  /**
   * Handle onChange value
   */
  const onChangeHandler = (value: string) => {
    props.onChange(value);
    setIsOpenMenu(false);
  };

  const renderDropdownMenuItems = props.dropdownMenuItems.map((item) => {
    return (
      <DropdownMenuItem
        key={item.id}
        value={item.value}
        text={item.text}
        currentValue={props.value}
        onChangeHandler={onChangeHandler}
      />
    );
  });

  return (
    <div className={styles.dropdown}>
      <div onClick={() => setIsOpenMenu(!isOpen)}>
        {props.trigger}
      </div>

      {isOpen &&
      <ul
        ref={refMenu}
        className={styles.menu}
      >
        {renderDropdownMenuItems}
      </ul>}
    </div>
  );
};
