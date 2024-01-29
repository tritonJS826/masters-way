import {ReactElement, useState} from "react";
import {
  Content as DropdownContent,
  Root as DropdownRoot,
} from "@radix-ui/react-dialog";
import {
  DropdownMenuItem,
  DropdownMenuItemType,
} from "src/component/dropdown/dropdownMenuItem/DropdownMenuItem";
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
   * DropdownMenuItems list
   */
  dropdownMenuItems: DropdownMenuItemType[];
}

/**
 * Dropdown conponent
 */
export const Dropdown = (props: DropdownProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const renderDropdownMenuItems = props.dropdownMenuItems.map((item) => {
    const {id, value, onClick, isVisible = true} = item;
    if (isVisible) {
      return (
        <DropdownMenuItem
          key={id}
          value={value}
          onClick={onClick}
        />
      );
    }
  });

  return (
    <div className={styles.dropdown}>
      <DropdownRoot
        open={isOpenMenu}
        onOpenChange={setIsOpenMenu}
      >
        <div onClick={() => setIsOpenMenu((prev) => !prev)}>
          {props.trigger}
        </div>

        <DropdownContent className={styles.dropdownContent}>
          {<ul className={styles.menu}>
            {renderDropdownMenuItems}
          </ul>}
        </DropdownContent>
      </DropdownRoot>
    </div>
  );
};
