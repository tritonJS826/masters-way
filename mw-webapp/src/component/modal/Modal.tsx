import {ReactElement, useState} from "react";
import {Root as DialogRoot} from "@radix-ui/react-dialog";
import {ModalContent} from "src/component/modal/ModalContent/ModalContent";
import {ModalTrigger} from "src/component/modal/ModalTrigger/ModalTrigger";

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
      <ModalTrigger>
        {props.trigger}
      </ModalTrigger>
      <ModalContent>
        {props.content}
      </ModalContent>
    </DialogRoot>
  );
};
