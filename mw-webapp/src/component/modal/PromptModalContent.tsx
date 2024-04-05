import {useRef, useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Input} from "src/component/input/Input";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/logic/wayPage/jobTags/newJobTagModalContent/NewJobTagModalContent.module.scss";

/**
 * PromptModalContent props
 */
interface PromptModalContentProps {

  /**
   * Default value
   * @default empty string
   */
  defaultValue?: string;

  /**
   * Callback to close modal
   */
  close: () => void;

  /**
   * Callback triggered on ok
   */
  onOk: (inputValue: string) => Promise<void> | void;

  /**
   * Placeholder in the input
   */
  placeholder: string;

  /**
   * Ok button value
   */
  okButtonValue: string;

  /**
   * Cancel button value
   */
  cancelButtonValue: string;

}

/**
 * New job done modal content
 */
export const PromptModalContent = (props: PromptModalContentProps) => {
  const [inputValue, setInputValue] = useState<string>(props.defaultValue ?? "");

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

  return (
    <div onKeyDown={handleEnter}>
      <Input
        type="text"
        placeholder={props.placeholder}
        value={inputValue}
        autoFocus={true}
        onChange={setInputValue}
      />
      <HorizontalContainer className={styles.buttons}>
        <DialogClose asChild>
          <Button
            value={props.cancelButtonValue}
            onClick={props.close}
          />
        </DialogClose>

        <DialogClose asChild>
          <Button
            ref={onOkRef}
            value={props.okButtonValue}
            onClick={() => props.onOk(inputValue)}
            buttonType={ButtonType.PRIMARY}
          />
        </DialogClose>
      </HorizontalContainer>
    </div>
  );
};
