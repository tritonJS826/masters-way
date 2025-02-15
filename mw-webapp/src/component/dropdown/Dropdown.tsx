import {ReactElement} from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {ChevronRightIcon} from "@radix-ui/react-icons";
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
  dataCySubContent?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCySubTrigger?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyContentList: string;

}

/**
 * Nested dropdown
 */
interface NestedDropdownItem {

  /**
   * The element that triggers the Dropdown
   */
  subTrigger?: ReactElement<HTMLElement>;

  /**
   * Is visible element
   */
  isVisible?: boolean;

  /**
   * DropdownMenuItems list
   */
  dropdownSubMenuItems: DropdownMenuItemType[];
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
  dropdownMenuItems: NestedDropdownItem[];

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
   * If false we can scroll dropdownItems and interact with page elements, if true then we can't
   * @default false
   */
  isModalBehavior?: boolean;
}

/**
 * Dropdown component
 */
export const Dropdown = (props: DropdownProps) => {

  /**
   * Render dropdown items
   */
  const renderDropdownMenuItems = (dropdownMenuItems: DropdownMenuItemType[]) => {
    return dropdownMenuItems.map((item) => {
      const isVisible = item.isVisible ?? true;

      if (isVisible) {
        return (
          <DropdownMenuItem
            key={item.id}
            value={item.value}
            onClick={item.onClick ?? (() => {})}
            dataCyContent={props.cy?.dataCyContent}
            isPreventDefaultUsed={item.isPreventDefaultUsed}
          />
        );
      }
    });
  };

  /**
   * Render sub content
   */
  const renderSubContent = (item: NestedDropdownItem) => {
    const isVisible = item.isVisible ?? true;
    if (isVisible) {
      return (
        <DropdownMenu.Sub key={item.subTrigger?.key}>
          <DropdownMenu.SubTrigger
            className={styles.dropdownMenuSubTrigger}
            data-cy={props.cy?.dataCySubTrigger}
          >
            {item.subTrigger}
            <ChevronRightIcon className={styles.icon} />
          </DropdownMenu.SubTrigger>
          <DropdownMenu.Portal>
            <DropdownMenu.SubContent
              className={styles.dropdownMenuSubContent}
              sideOffset={0}
              alignOffset={0}
              data-cy={props.cy?.dataCySubContent}
            >
              {renderDropdownMenuItems(item.dropdownSubMenuItems)}
            </DropdownMenu.SubContent>
          </DropdownMenu.Portal>
        </DropdownMenu.Sub>
      );
    }
  };

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
          {props.dropdownMenuItems.map((item) => {
            return (
              !item.subTrigger
                ? renderDropdownMenuItems(item.dropdownSubMenuItems)
                : renderSubContent(item)
            );
          })
          }
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );

};
