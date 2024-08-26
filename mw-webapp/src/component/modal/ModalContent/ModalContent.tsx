import {PropsWithChildren} from "react";
import {
  Close as DialogClose,
  Content as DialogContent,
  Overlay as DialogOverlay,
  Portal as DialogPortal,
} from "@radix-ui/react-dialog";
import {Cross2Icon} from "@radix-ui/react-icons";
import clsx from "clsx";
import {CyContent} from "src/component/modal/Modal";
import styles from "src/component/modal/ModalContent/ModalContent.module.scss";

/**
 * ModalContent props
 */
interface ModalContentProps {

  /**
   * Data attribute for cypress testing
   */
  dataCyContent?: CyContent;

  /**
   * ModalContent className
   */
  className?: string;

  /**
   * Callback to close modal
   */
  close?: () => void;

}

/**
 * A container for the content to be displayed within a modal dialog.
 */
export const ModalContent = (props: PropsWithChildren<ModalContentProps>) => {
  return (
    <DialogPortal>
      <DialogOverlay
        data-cy={props.dataCyContent?.dataCyOverlay}
        className={styles.dialogOverlay}
      />
      <DialogContent
        data-cy={props.dataCyContent?.dataCyContent}
        className={clsx(styles.dialogContent, props.className)}
        onInteractOutside={props.close}
      >
        {props.children}
        <DialogClose
          data-cy={props.dataCyContent?.dataCyClose}
          asChild
        >
          <button
            className={styles.closeButton}
            onClick={props.close}
          >
            <Cross2Icon />
          </button>
        </DialogClose>
      </DialogContent>
    </DialogPortal>
  );
};
