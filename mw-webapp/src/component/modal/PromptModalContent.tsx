import {useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button} from "src/component/button/Button";
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
  onOk: (inputValue: string) => Promise<void>;
}

/**
 * New job done modal content
 */
export const PromptModalContent = (props: PromptModalContentProps) => {
  const [inputValue, setInputValue] = useState<string>(props.defaultValue ?? "");

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {
      props.onOk(inputValue);
      props.close();
    }
  };

  return (
    <div onKeyDown={handleEnter}>
      <Input
        type="text"
        value={inputValue}
        autoFocus={true}
        onChange={setInputValue}
      />
      <HorizontalContainer className={styles.buttons}>
        <DialogClose asChild>
          <Button
            value="Cancel"
            onClick={props.close}
          />
        </DialogClose>
        <DialogClose asChild>
          <Button
            value="Create"
            onClick={() => props.onOk(inputValue)}
          />
        </DialogClose>
      </HorizontalContainer>
    </div>
  );
};
