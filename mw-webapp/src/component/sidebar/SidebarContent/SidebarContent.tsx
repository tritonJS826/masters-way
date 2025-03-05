import {PropsWithChildren} from "react";
import {
  Close as DialogClose,
  Content as DialogContent,
  Overlay as DialogOverlay,
  Portal as DialogPortal,
} from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
import clsx from "clsx";
import {Button, ButtonType} from "src/component/button/Button";
import {CyContent} from "src/component/sidebar/Sidebar";
import styles from "src/component/sidebar/SidebarContent/SidebarContent.module.scss";

/**
 * SidebarContent props
 */
interface SidebarContentProps extends PropsWithChildren {

  /**
   * Data attribute for cypress testing
   */
  dataCyContent?: CyContent;

  /**
   * Class name
   */
  className: string;

}

/**
 * A container for the content to be displayed within a Sidebar.
 */
export const SidebarContent = (props: SidebarContentProps) => {
  return (
    <DialogPortal>
      <DialogOverlay
        role="overlay"
        data-cy={props.dataCyContent?.dataCyOverlay}
        className={styles.dialogOverlay}
      />
      <DialogContent
        data-cy={props.dataCyContent?.dataCyContent}
        className={clsx(styles.dialogContent, props.className)}
      >
        {props.children}
        <DialogClose asChild>
          <Button
            dataCy={props.dataCyContent?.dataCyClose}
            className={styles.closeButton}
            buttonType={ButtonType.ICON_BUTTON}
            icon={<Cross2Icon />}
            onClick={() => {}}
          />
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  );
};
