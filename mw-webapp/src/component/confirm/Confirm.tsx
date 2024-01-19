import {ReactElement, useState} from "react";
import {Button} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Modal} from "src/component/modal/Modal";
import styles from "src/component/confirm/Confirm.module.scss";

/**
 * Confirm props
 */
interface ConfirmProps {

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

  /**
   * Confirm content
   */
  const confirmContent = () => {
    return (
      <>
        {props.content}
        <HorizontalContainer className={styles.buttons}>
          <Button
            value="Cancel"
            onClick={() => setIsOpen(false)}
          />
          <Button
            value={props.okText}
            onClick={() => {
              props.onOk();
              setIsOpen(false);
            }
            }
          />
        </HorizontalContainer>
      </>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      content={confirmContent()}
    />
  );
};
