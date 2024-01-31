import {Fragment, ReactElement, useState} from "react";
import {
  Content as DropdownContent,
  Root as DropdownRoot,
} from "@radix-ui/react-dialog";
import clsx from "clsx";
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

  /**
   * Custom class name
   */
  className?: string;
}

/**
 * Dropdown component
 */
export const Dropdown = (props: DropdownProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const renderDropdownMenuItems = props.dropdownMenuItems.map((item) => {
    const isVisible = item.isVisible ?? true;

    if (isVisible) {
      if (typeof item.value !== "string") {
        return (
          <Fragment key={item.id}>
            {item.value}
          </Fragment>
        );
      } else {
        return (
          <DropdownMenuItem
            key={item.id}
            value={item.value}
            onClick={item.onClick ?? (() => {})}
          />
        );

      }
    } else {
      return null;
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

        <DropdownContent className={clsx(styles.dropdownContent, props.className)}>
          <ul className={styles.menu}>
            {renderDropdownMenuItems}
          </ul>
        </DropdownContent>
      </DropdownRoot>
    </div>
  );
};
