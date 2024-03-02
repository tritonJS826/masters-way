import {PropsWithChildren} from "react";
import {
  Close as DialogClose,
  Content as DialogContent,
  Overlay as DialogOverlay,
  Portal as DialogPortal,
} from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
import {CyContent} from "src/component/sidebar/Sidebar";
import styles from "src/component/sidebar/SidebarContent/SidebarContent.module.scss";

/**
 * SidebarContent props
 */
interface SidebarContentProps extends PropsWithChildren {

  /**
   * Callback triggered on SidebarContent click
   */
  onClick: () => void;

  /**
   * Data attribute for cypress testing
   */
  dataCyContent?: CyContent;

}

/**
 * A container for the content to be displayed within a Sidebar.
 */
export const SidebarContent = (props: SidebarContentProps) => {

  /**
   * Handle onClick event
   */
  const onClickHandler = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target instanceof HTMLAnchorElement) {
      props.onClick();
    }
  };

  return (
    <DialogPortal>
      <div data-cy={props.dataCyContent?.dataCyContent}>
        <DialogOverlay
          data-cy={props.dataCyContent?.dataCyOverlay}
          className={styles.dialogOverlay}
        />
        <DialogContent
          className={styles.dialogContent}
          onClick={onClickHandler}
        >
          {props.children}
          <DialogClose asChild>
            <button
              data-cy={props.dataCyContent?.dataCyClose}
              className={styles.closeButton}
            >
              <Cross2Icon />
            </button>
          </DialogClose>
        </DialogContent>
      </div>
    </DialogPortal>
  );
};
