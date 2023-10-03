import {PropsWithChildren, ReactElement} from "react";
import {
  Close as DialogClose,
  Content as DialogContent,
  Overlay as DialogOverlay,
  Portal as DialogPortal,
} from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
import styles from "src/component/modal/ModalContent/ModalContent.module.scss";

interface ModalContentProps<T> {
  /**
   * The content to be displayed within the modal.
   */
  children: ReactElement<T>;
}

/**
 * A container for the content to be displayed within a modal dialog.
 */
export const ModalContent = <T extends HTMLElement>(props: PropsWithChildren<ModalContentProps<T>>) => {
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
