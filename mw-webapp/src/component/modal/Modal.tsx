import {ReactElement} from "react";
import {Root as DialogRoot} from "@radix-ui/react-dialog";
import {ModalContent} from "src/component/modal/ModalContent/ModalContent";

/**
 * Modal props
 */
interface ModalProps {

  /**
   * The content to display within the modal.
   */
  content: ReactElement<HTMLElement>;

  /**
   * Controls whether the modal is open or closed.
   */
  isOpen: boolean;

  /**
   * Function that handles closing the modal.
   */
  handleClose: () => void;
}

/**
 * Modal component
 */
export const Modal = (props: ModalProps) => {

  return (
    <DialogRoot
      open={props.isOpen}
      onOpenChange={props.handleClose}
    >
      <ModalContent>
        {props.content}
      </ModalContent>
    </DialogRoot>
  );
};
