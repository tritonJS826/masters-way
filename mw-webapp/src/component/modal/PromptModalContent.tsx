import {useRef, useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Input, InputType} from "src/component/input/Input";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/component/modal/PromptModalContent.module.scss";

/**
 * Data attributes for cypress testing
 */
export interface Cy {

  /**
   * Data attribute for cypress testing
   */
  dataCyCreateButton?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyInput?: string;

}

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

  /**
   * Title name
   */
  title?: string;

  /**
   * Data attributes for cypress testing
   */
  cy?: Cy;
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
      <VerticalContainer className={styles.container}>

        {props.title &&
        <Title
          level={HeadingLevel.h2}
          text={props.title}
          placeholder=""
        />
        }

        <Input
          type="text"
          placeholder={props.placeholder}
          value={inputValue}
          autoFocus={true}
          onChange={setInputValue}
          typeInput={InputType.Line}
          dataCy={props.cy?.dataCyInput}
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
              isDisabled={inputValue.trim() === ""}
              dataCy={props.cy?.dataCyCreateButton}
            />
          </DialogClose>
        </HorizontalContainer>
      </VerticalContainer>
    </div>
  );
};
