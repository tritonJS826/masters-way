import {ReactElement, useRef, useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Modal} from "src/component/modal/Modal";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/component/confirm/Confirm.module.scss";

/**
 * Confirm props
 */
interface ConfirmProps {

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
  onOk: () => void;

  /**
   * Text for button that handle onOk click
   */
  okText: string;

}

/**
 * Confirm component
 */
export const Confirm = (props: ConfirmProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen ?? false);

  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {
      buttonRef.current?.click();
    }
  };

  /**
   * Confirm content
   */
  const renderConfirmContent = () => {
    return (
      <div onKeyDown={handleEnter}>
        {props.content}
        <HorizontalContainer className={styles.buttons}>
          <DialogClose asChild>
            <Button
              value="Cancel"
              onClick={() => setIsOpen(false)}
            />
          </DialogClose>
          <DialogClose asChild>
            <Button
              ref={buttonRef}
              value={props.okText}
              onClick={props.onOk}
              buttonType={ButtonType.PRIMARY}
            />
          </DialogClose>
        </HorizontalContainer>
      </div>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      content={renderConfirmContent()}
      trigger={props.trigger}
    />
  );
};
