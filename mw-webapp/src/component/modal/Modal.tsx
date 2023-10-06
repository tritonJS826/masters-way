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
   * Controls whether the model is initially open or closed.
   * @default false
   */
  open?: boolean;
}

/**
 * A component that creates a modal dialog.
 *  @param {ModalProps} props
 *  @returns {JSX.Element}
 */
export const Modal = (props: ModalProps): JSX.Element => {
  const [open, setOpen] = useState(props.open ?? false);

  return (
    <DialogRoot
      open={open}
      onOpenChange={setOpen}
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
