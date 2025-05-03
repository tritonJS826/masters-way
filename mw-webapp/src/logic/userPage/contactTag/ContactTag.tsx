import {Avatar} from "src/component/avatar/Avatar";
import {Confirm} from "src/component/confirm/Confirm";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {Modal} from "src/component/modal/Modal";
import {displayNotification, NotificationType} from "src/component/notification/displayNotification";
import {ContactDAL} from "src/dataAccessLogic/ContactDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {ContactData, ContactsModalContent} from "src/logic/userPage/ContactsModalContent";
import {Contact} from "src/model/businessModel/Contact";
import {LanguageService} from "src/service/LanguageService";

/**
 *Data attribute for cypress testing
 */
interface Cy {

  /**
   * Tag itself
   */
  dataCyTag: string;

  /**
   * Button to remove tag
   */
  dataCyCross: string;

  /**
   * Button to update tag
   */
  dataCyUpdate: string;

}

/**
 * Interface for tag props
 */
interface TagProps {

  /**
   * Contact
   */
  contact: Contact;

  /**
   * User ID
   */
  userId: string;

  /**
   * Data attributes for cypress testing
   */
  cy?: Cy;

  /**
   * If true - user is page owner
   */
  isPageOwner: boolean;

  /**
   * Callback triggered on delete
   */
  onDelete: () => void;

}

/**
 * Contact tag with avatar component
 */
export const ContactTag = (props: TagProps) => {
  const {language} = languageStore;

  const processedContactLink = props.contact.contactLink.replace(/^(https?:\/\/)?/, "").split("/")[0];

  /**
   * Add protocol if user enters a link without http or https
   */
  const getUrlAbsolute = (url: string): string => {
    if (!/^\/\//.test(url) && !/^https?:\/\//i.test(url)) {
      return `https://${url}`;
    }

    return url;
  };

  /**
   * Update contact
   */
  const updateContact = async (params: ContactData) => {
    props.contact.updateContact({contactLink: params.contactLink, description: params.description});

    await ContactDAL.updateContact({
      contactId: props.contact.uuid,
      userId: props.userId,
      contactLink: params.contactLink,
      description: params.description,
    });
  };

  const updateContactConfirm = (
    <Modal
      trigger={<>
        {LanguageService.user.personalInfo.updateContactModal[language]}
      </>}
      content={
        <ContactsModalContent
          close={() => {}}
          initialContact={props.contact}
          okButtonText={LanguageService.user.personalInfo.updateContactModal[language]}
          onOk={(contact: ContactData) => updateContact(contact)}
        />}
    />
  );

  const deleteContactConfirm = (
    <Confirm
      trigger={<>
        {LanguageService.user.personalInfo.deleteContactButton[language]}
      </>}
      content={<p>
        {`${LanguageService.user.personalInfo.deleteButtonConfirmation[language]} "${props.contact.contactLink}" ?`}
      </p>}
      onOk={props.onDelete}
      okText={LanguageService.modals.confirmModal.deleteButton[language]}
      cancelText={LanguageService.modals.confirmModal.cancelButton[language]}
    />
  );

  return (
    <Dropdown
      trigger={(
        <Avatar
          src={`https://img.logo.dev/${processedContactLink}?token=pk_LceEaDNtTWGchSCHHEvxHQ`}
          alt={`${processedContactLink} logo`}
        />
      )}
      dropdownMenuItems={[
        {
          dropdownSubMenuItems: [
            {
              id: "Visit",
              value: LanguageService.user.personalInfo.visitContact[language],
              isPreventDefaultUsed: false,

              /**
               * Visit link
               */
              onClick: () => {
                window.open(getUrlAbsolute(props.contact.contactLink), "_blank", "noopener,noreferrer");
              },
            },
            {
              id: "Copy",
              value: LanguageService.user.personalInfo.copyContact[language],
              isPreventDefaultUsed: false,

              /**
               * Copy url to clipboard
               */
              onClick: async () => {
                await navigator.clipboard.writeText(props.contact.contactLink);
                displayNotification({
                  text: LanguageService.training.notifications.urlCopied[language],
                  type: NotificationType.INFO,
                });
              },
            },
            {
              id: "Edit",
              value: updateContactConfirm,
              isPreventDefaultUsed: true,
              isVisible: props.isPageOwner,
            },
            {
              id: "Delete",
              value: deleteContactConfirm,
              isPreventDefaultUsed: true,
              isVisible: props.isPageOwner,
            },
          ],
        },

      ]}
    />
  );
};
