import {useRef, useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Input, InputType} from "src/component/input/Input";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {languageStore} from "src/globalStore/LanguageStore";
import {Contact} from "src/model/businessModel/Contact";
import {LanguageService} from "src/service/LanguageService";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/component/modal/PromptModalContent.module.scss";

/**
 * Data attributes for cypress testing
 */
export interface ContactsCy {

  /**
   * Data attribute for cypress testing
   */
  dataCyUpdateButton?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyCreateButton?: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyInput: string;

  /**
   * Data attribute for cypress testing
   */
  dataCyCancel: string;
}

/**
 * Contact data for create/update operations
 */
export interface ContactData {

  /**
   * Contact link
   */
  contactLink: string;

  /**
   * Contact description
   */
  description: string;

}

/**
 * ContactsModalContent props
 */
interface ContactsModalContentProps {

  /**
   * Initial contact data for editing (optional)
   * If provided, component will operate in "update" mode
   */
  initialContact?: Contact;

  /**
   * OK button text
   */
  okButtonText: string;

  /**
   * Callback triggered on onOK button
   */
  onOk: (contact: ContactData) => Promise<void>;

  /**
   * Callback to close modal
   */
  close: () => void;

  /**
   * Data attributes for cypress testing
   */
  cy?: ContactsCy;
}

/**
 * Modal content for creating or updating contacts
 */
export const ContactsModalContent = (props: ContactsModalContentProps) => {
  const {language} = languageStore;
  const [contactLink, setContactLink] = useState<string>(props.initialContact?.contactLink ?? "");
  const [contactDescription, setContactDescription] = useState<string>(props.initialContact?.description ?? "");
  const titleText = LanguageService.user.personalInfo.addContactModalTitle[language];

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
        <Title
          level={HeadingLevel.h2}
          text={titleText}
          placeholder=""
        />
        <Input
          type="text"
          placeholder={LanguageService.user.personalInfo.addContactModalLink[language]}
          value={contactLink}
          onChange={setContactLink}
          typeInput={InputType.Line}
          dataCy={props.cy?.dataCyInput}
        />

        <Input
          type="text"
          placeholder={LanguageService.user.personalInfo.addContactModalDescription[language]}
          value={contactDescription}
          onChange={setContactDescription}
          typeInput={InputType.Line}
          dataCy={props.cy?.dataCyInput}
        />

        <HorizontalContainer className={styles.buttons}>
          <DialogClose asChild>
            <Button
              value={LanguageService.modals.promptModal.cancelButton[language]}
              onClick={props.close}
              dataCy={props.cy?.dataCyCancel}
            />
          </DialogClose>
          <DialogClose asChild>
            <Button
              value={props.okButtonText}
              onClick={() => props.onOk({
                contactLink,
                description: contactDescription,
              })}
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
