import {DialogClose} from "@radix-ui/react-dialog";
import {Button, ButtonType} from "src/component/button/Button";
import {Modal} from "src/component/modal/Modal";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import styles from "src/component/errorPromiseModal/ErrorPromiseModal.module.scss";

/**
 * Error promise modal props
 */
interface ErrorPromiseModalProps {

  /**
   * Is error catched
   */
  isErrorCatched: boolean;

  /**
   * Error message
   */
  errorMessage: string;

  /**
   * Ok button text
   */
  okText: string;
}

/**
 * Error promise Modal
 */
export const ErrorPromiseModal = (props: ErrorPromiseModalProps) => {
  return (
    <Modal
      isOpen={props.isErrorCatched}
      content={
        <VerticalContainer className={styles.errorPromiseContentWrapper}>
          {props.errorMessage}
          <DialogClose asChild>
            <Button
              value={props.okText}
              onClick={() => {}}
              buttonType={ButtonType.PRIMARY}
            />
          </DialogClose>
        </VerticalContainer>
      }
      trigger={<></>}
    />
  );
};
