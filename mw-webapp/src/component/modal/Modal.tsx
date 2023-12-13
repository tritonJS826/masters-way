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
  open: boolean;

  /**
   * Function to set the open state.
   */
  setOpen: (open: boolean) => void;
}

/**
 * Modal component
 */
export const Modal = ({open, setOpen, content}: ModalProps) => {

  return (
    <DialogRoot
      open={open}
      onOpenChange={setOpen}
    >
      <ModalContent>
        {content}
      </ModalContent>
    </DialogRoot>
  );
};
