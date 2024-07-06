import {ReactElement, useState} from "react";
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
 * Data attributes for cypress testing
 */
interface Cy {

  /**
   * Data attribute for cypress testing
   */
  dataCyOverlay?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyContent?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyContentList: string;

}

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
   * Custom class name of content
   */
  contentClassName?: string;

  /**
   * Custom class name of root element
   */
  className?: string;

  /**
   * Data attributes for cypress testing
   */
  cy?: Cy;
}

/**
 * Dropdown component
 */
export const Dropdown = (props: DropdownProps) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);

  const renderDropdownMenuItems = props.dropdownMenuItems.map((item) => {
    const isVisible = item.isVisible ?? true;

    if (isVisible) {
      return (
        <DropdownMenuItem
          key={item.id}
          value={item.value}
          onClick={item.onClick ?? (() => {})}
          dataCyContent={props.cy?.dataCyContent}
        />
      );

    } else {
      return null;
    }
  });

  return (
    <div
      className={clsx(styles.dropdown, props.className)}
      data-cy={props.cy?.dataCyOverlay}
    >
      <DropdownRoot
        open={isOpenMenu}
        onOpenChange={setIsOpenMenu}
        modal={false}
      >
        <div onClick={() => setIsOpenMenu((prev) => !prev)}>
          {props.trigger}
        </div>

        <DropdownContent
          className={clsx(styles.dropdownContent, props.contentClassName)}
          data-cy={props.cy?.dataCyContentList}
        >
          <ul className={styles.menu}>
            {renderDropdownMenuItems}
          </ul>
        </DropdownContent>
      </DropdownRoot>
    </div>
  );
};
