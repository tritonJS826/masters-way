import {PropsWithChildren} from "react";
import {
  Close as DialogClose,
  Content as DialogContent,
  Overlay as DialogOverlay,
  Portal as DialogPortal,
} from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
import styles from "src/component/sidebar/SidebarContent/SidebarContent.module.scss";

/**
 * A container for the content to be displayed within a Sidebar.
 */
export const SidebarContent = (props: PropsWithChildren) => {
  return (
    <DialogPortal>
      <DialogOverlay className={styles.dialogOverlay} />
      <DialogContent className={styles.dialogContent}>
        {props.children}
        <DialogClose asChild>
          <button className={styles.closeButton}>
            <Cross2Icon />
          </button>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  );
};