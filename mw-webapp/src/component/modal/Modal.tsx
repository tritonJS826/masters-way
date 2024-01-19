import {ReactElement, useState} from "react";
import {Root as DialogRoot} from "@radix-ui/react-dialog";
import {Button} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {ModalContent} from "src/component/modal/ModalContent/ModalContent";
import styles from "src/component/modal/Modal.module.scss";

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
   * Handle on ok click
   */
  onOk: () => void;

  /**
   * Text for button that handle onOk click
   */
  text: string;
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
      <ModalContent>
        {props.content}
        <HorizontalContainer className={styles.buttons}>
          <Button
            value="Cancel"
            onClick={() => setIsOpen(false)}
          />
          <Button
            value={props.text}
            onClick={() => {
              props.onOk();
              setIsOpen(false);
            }
            }
          />
        </HorizontalContainer>
      </ModalContent>
    </DialogRoot>
  );
};
