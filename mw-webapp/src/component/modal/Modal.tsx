import {ReactElement} from "react";
import {Root as DialogRoot} from "@radix-ui/react-dialog";
import {ModalContent} from "src/component/modal/ModalContent/ModalContent";
import {ModalTrigger} from "src/component/modal/ModalTrigger/ModalTrigger";

interface DialogProps {
  /**
   * The element that triggers the modal.
   */
  trigger: ReactElement<HTMLElement>;
  /**
   * The content to display within the modal.
   */
  content: ReactElement<HTMLElement>;
}

/**
 * A component that creates a modal dialog. It requires a trigger
 * element and content to display within the modal.
 */
export const Modal = (props: DialogProps) => {
  return (
    <DialogRoot>
      <ModalTrigger>
        {props.trigger}
      </ModalTrigger>
      <ModalContent>
        {props.content}
      </ModalContent>
    </DialogRoot>
  );
};
