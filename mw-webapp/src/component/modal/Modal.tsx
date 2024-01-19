import {ReactElement, useState} from "react";
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
   * Controls whether the modal is initially open or closed.
   * @default false
   */
  isOpen?: boolean;

  /**
   * Sdfd
   */
  id?: string;
}

/**
 * Modal component
 */
export const Modal = (props: ModalProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);

  return (
    <div id={props.id}>
      <DialogRoot
        open={isOpen}
        onOpenChange={setIsOpen}
      >
        <ModalContent>
          {props.content}
        </ModalContent>
      </DialogRoot>
    </div>
  );
};
