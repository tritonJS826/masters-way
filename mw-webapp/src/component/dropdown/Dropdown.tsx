import {ReactElement} from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
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

  /**
   * If false we can scroll dropdownItems and interract with page elements, if true then we can't
   * @default false
   */
  isModalBehavior?: boolean;
}

/**
 * Dropdown component
 */
export const Dropdown = (props: DropdownProps) => {

  const renderDropdownMenuItems = props.dropdownMenuItems.map((item) => {
    const isVisible = item.isVisible ?? true;

    if (isVisible) {
      return (
        <DropdownMenuItem
          key={item.id}
          value={item.value}
          onClick={item.onClick ?? (() => { })}
          dataCyContent={props.cy?.dataCyContent}
        />
      );

    } else {
      return null;
    }
  });

  return (
    <DropdownMenu.Root
      data-cy={props.cy?.dataCyOverlay}
      modal={!!props.isModalBehavior}
    >
      <DropdownMenu.Trigger asChild>
        <div role="button">
          {props.trigger}
        </div>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          className={clsx(styles.dropdownContent, props.contentClassName)}
          data-cy={props.cy?.dataCyContentList}
        >
          {renderDropdownMenuItems}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );

};
