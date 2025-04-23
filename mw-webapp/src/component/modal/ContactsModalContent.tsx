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

  /**
   * Data attribute for cypress testing
   */
  dataCyCancel?: string;

}

/**
 * PromptModalContent props
 */
interface ContactsModalContentProps {

  /**
   * Contact link
   */
  contactLink?: string;

  /**
   * Contact description
   */
  contactDescription?: string;

  /**
   * Callback to close modal
   */
  close: () => void;

  /**
   * Callback triggered on ok
   */
  onOk: (contactLink: string, contactDescription: string) => Promise<void> | void;

  /**
   * Placeholder in the first input
   */
  placeholderForFirstInput?: string;

  /**
   * Placeholder in the second input
   */
  placeholderForSecondInput?: string;

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
export const ContactsModalContent = (props: ContactsModalContentProps) => {
  const [contactLink, setContactLink] = useState<string>(props.contactLink ?? "");
  const [contactDescription, setContactDescription] = useState<string>(props.contactDescription ?? "");
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
          placeholder={props.placeholderForFirstInput}
          value={contactLink}
          autoFocus={true}
          onChange={setContactLink}
          typeInput={InputType.Line}
          dataCy={props.cy?.dataCyInput}
        />
        <Input
          type="text"
          placeholder={props.placeholderForSecondInput}
          value={contactDescription}
          autoFocus={true}
          onChange={setContactDescription}
          typeInput={InputType.Line}
          dataCy={props.cy?.dataCyInput}
        />
        <HorizontalContainer className={styles.buttons}>
          <DialogClose asChild>
            <Button
              value={props.cancelButtonValue}
              onClick={props.close}
              dataCy={props.cy?.dataCyCancel}
            />
          </DialogClose>

          <DialogClose asChild>
            <Button
              ref={onOkRef}
              value={props.okButtonValue}
              onClick={() => props.onOk(contactLink, contactDescription)}
              buttonType={ButtonType.PRIMARY}
              isDisabled={contactLink.trim() === ""}
              dataCy={props.cy?.dataCyCreateButton}
            />
          </DialogClose>
        </HorizontalContainer>
      </VerticalContainer>
    </div>
  );
};
