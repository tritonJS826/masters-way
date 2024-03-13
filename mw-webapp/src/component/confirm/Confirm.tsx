import {ReactElement, useRef, useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Cy, Modal} from "src/component/modal/Modal";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/component/confirm/Confirm.module.scss";

/**
 * Data attributes for cypress testing
 */
interface cyDataConfirm extends Cy {

  /**
   * Data attribute for cypress testing
   */
  btnCancel?: string;

  /**
   * Data attribute for cypress testing
   */
  btnOk?: string;
}

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

  /**
   * Handle on cancel click
   */
  onCancel?: () => void;

  /**
   * Data attributes for cypress testing
   */
  cy?: cyDataConfirm;
}

/**
 * Confirm component
 */
export const Confirm = (props: ConfirmProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(props.isOpen ?? false);

  const onOkRef = useRef<HTMLButtonElement>(null);

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {

      /**
       * Workaround to to close Radix modal onEnter
       */
      onOkRef.current?.click();
    }
  };

  /**
   * ACtion triggered on cancel click
   */
  const onCancelClick = () => {
    props.onCancel && props.onCancel();
    setIsOpen(false);
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
              onClick={onCancelClick}
              dataCy={props.cy?.btnCancel}
            />
          </DialogClose>
          <DialogClose asChild>
            <Button
              ref={onOkRef}
              value={props.okText}
              onClick={props.onOk}
              buttonType={ButtonType.PRIMARY}
              dataCy={props.cy?.btnOk}
            />
          </DialogClose>
        </HorizontalContainer>
      </div>
    );
  };

  return (
    <Modal
      cy={props.cy}
      isOpen={isOpen}
      content={renderConfirmContent()}
      trigger={props.trigger}
    />
  );
};
