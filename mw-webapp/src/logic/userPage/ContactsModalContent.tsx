import {useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Input, InputType} from "src/component/input/Input";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {ContactDAL} from "src/dataAccessLogic/ContactDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {Contact} from "src/model/businessModel/Contact";
import {User} from "src/model/businessModel/User";
import {LanguageService} from "src/service/LanguageService";
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
   *Contact description
   */
  description?: string;

  /**
   * Contact UUID
   */
  uuid?: string;
}

/**
 * ContactsModalContent props
 */
interface ContactsModalContentProps {

  /**
   * User ID to create/update contact for
   */
  userId: string;

  /**
   * UserPageOwner object reference
   */
  userPageOwner?: User;

  /**
   * User object reference
   */
  user?: User;

  /**
   * Callback to close modal
   */
  close: () => void;

  /**
   * Initial contact data for editing (optional)
   * If provided, component will operate in "update" mode
   */
  initialContact?: ContactData;

  /**
   * Data attributes for cypress testing
   */
  cy?: ContactsCy;

  /**
   * Callback to handle contact update
   * This is called when the contact is updated
   */
  onUpdate?: (contact: Contact) => Promise<void> | void;
}

/**
 * Modal content for creating or updating contacts
 */
export const ContactsModalContent = (props: ContactsModalContentProps) => {
  const {language} = languageStore;
  const [contactLink, setContactLink] = useState<string>(props.initialContact?.contactLink ?? "");
  const [contactDescription, setContactDescription] = useState<string>(props.initialContact?.description ?? "");

  const isEditMode = Boolean(props.initialContact);

  const actionButtonText = (isEditMode
    ? LanguageService.user.personalInfo.updateContactModal[language] :
    LanguageService.user.personalInfo.addContactModal[language]);

  const titleText = LanguageService.user.personalInfo.addContactModalTitle[language];

  /**
   * Handle update/create contact
   */
  const handleSubmit = async (event?: React.FormEvent) => {
    if (event) {
      event.preventDefault();
    }
    if (contactLink.trim() === "") {
      return;
    }

    if (isEditMode && props.initialContact?.uuid) {
      await ContactDAL.updateContact({
        userId: props.userId,
        contactId: props.initialContact.uuid,
        request: {
          contactLink,
          description: contactDescription,
        },
      });

      if (props.onUpdate) {
        await props.onUpdate(
          new Contact({
            uuid: props.initialContact.uuid,
            contactLink,
            description: contactDescription,
          }),
        );
      }
    } else {
      const contact = await ContactDAL.createContact({
        ownerUuid: props.userId,
        contactLink,
        description: contactDescription,
      });

      props.userPageOwner?.addContact(contact);
    }

    props.close();
  };

  return (
    //I use form here overwise the enter key will not work because of radix dialog and async function
    <form onSubmit={handleSubmit}>
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
          autoFocus={true}
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

          <Button
            value={actionButtonText}
            onClick={handleSubmit}
            buttonType={ButtonType.PRIMARY}
            isDisabled={contactLink.trim() === ""}
            dataCy={props.cy?.dataCyCreateButton}
          />

        </HorizontalContainer>
      </VerticalContainer>
    </form>
  );
};
