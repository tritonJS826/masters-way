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

}

/**
 * New job done modal content
 */
export const PromptModalContent = (props: PromptModalContentProps) => {
  const [inputValue, setInputValue] = useState<string>(props.defaultValue ?? "");

  const buttonRef = useRef<HTMLButtonElement>(null);

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {

      /**
       * Workaround to to close Radix modal onEnter
       */
      buttonRef.current?.click();
    }
  };

  return (
    <DialogClose asChild>
      <div onKeyDown={handleEnter}>
        <Input
          type="text"
          placeholder="tag"
          value={inputValue}
          autoFocus={true}
          onChange={setInputValue}
        />
        <HorizontalContainer className={styles.buttons}>
          <Button
            value="Cancel"
            onClick={props.close}
          />

          <Button
            ref={buttonRef}
            value="Create"
            onClick={() => props.onOk(inputValue)}
            buttonType={ButtonType.PRIMARY}
          />
        </HorizontalContainer>
      </div>
    </DialogClose>
  );
};
