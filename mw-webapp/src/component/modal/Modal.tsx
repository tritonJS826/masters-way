import {ReactElement, useState} from "react";
import {Root as DialogRoot} from "@radix-ui/react-dialog";
import {ModalContent} from "src/component/modal/ModalContent/ModalContent";
import {ModalTrigger} from "src/component/modal/ModalTrigger/ModalTrigger";
import {KeySymbols} from "src/utils/KeySymbols";

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
   * Handle on ok click
   */
  onOk?: () => void;

  /**
   * Handle on ok click
   */
  onOk2?: (newJobTag: string) => Promise<void>;

}

/**
 * Modal component
 */
export const Modal = (props: ModalProps) => {
  const [isOpen, setIsOpen] = useState(props.isOpen ?? false);

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {
      props.onOk && props.onOk();
      setIsOpen(false);
    }
  };

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={setIsOpen}
    >
      <ModalTrigger>
        {props.trigger}
      </ModalTrigger>
      <div onKeyDown={handleEnter}>
        <ModalContent>
          {props.content}
        </ModalContent>
      </div>
    </DialogRoot>
  );
};
