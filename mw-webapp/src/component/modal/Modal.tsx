import {ReactElement, useState} from "react";
import {Root as DialogRoot} from "@radix-ui/react-dialog";
import {ModalContent} from "src/component/modal/ModalContent/ModalContent";
import {ModalTrigger} from "src/component/modal/ModalTrigger/ModalTrigger";

/**
 * Data attributes for cypress testing
 */
export interface CyContent {

  /**
   * Data attribute for cypress testing
   */
  dataCyOverlay?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyClose?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyContent?: string;

}

/**
 * Data attributes for cypress testing
 */
export interface Cy {

  /**
   * Data attribute for cypress testing
   */
  dataCyTrigger?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyContent?: CyContent;

}

/**
 * Modal props
 */
interface ModalProps {

  /**
   * The element that triggers the modal.
   */
  trigger: ReactElement<HTMLElement>;

  /**
   * The content to display within the modal.
   */
  content: ReactElement<HTMLElement>;

  /**
   * Controls whether the modal is initially open or closed.
   * @default false
   */
  isOpen?: boolean;

  /**
   * ModalContent className
   */
  contentClassName?: string;

    /**
     * ModalTrigger className
     */
    triggerClassName?: string;

  /**
   * Data attributes for cypress testing
   */
  cy?: Cy;

}

/**
 * Modal component
 */
export const Modal = (props: ModalProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <ModalTrigger
        triggerClassName={props.triggerClassName}
        dataCyTrigger={props.cy?.dataCyTrigger}
      >
        {props.trigger}
      </ModalTrigger>
      <ModalContent
        dataCyContent={props.cy?.dataCyContent}
        className={props.contentClassName}
      >
        {props.content}
      </ModalContent>
    </DialogRoot>
  );
};
