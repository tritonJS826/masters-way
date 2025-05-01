import {useState} from "react";
import {userPersonalDataAccessIds} from "cypress/accessIds/userPersonalDataAccessIds";
import {Avatar} from "src/component/avatar/Avatar";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Modal} from "src/component/modal/Modal";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {languageStore} from "src/globalStore/LanguageStore";
import {ContactsModalContent} from "src/logic/userPage/ContactsModalContent";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/logic/userPage/ContactTag/ContactTag.module.scss";

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
 * Interface for update contact request
 */
interface UpdateContactRequest {

    /**
     * Contact link
     */
    contactLink: string;

    /**
     * Optional contact description
     */
    description?: string;
  }

/**
 * Interface for tag props
 */
interface TagProps {

  /**
   * Contact link
   */
  contactLink: string;

  /**
   * Optional contact description
   */
  description?: string;

  /**
   * User ID
   */
  userId: string;

  /**
   * Contact ID
   */
  contactId: string;

  /**
   * Whether the tag can be deleted
   */
  isDeletable: boolean;

  /**
   * Data attributes for cypress testing
   */
  cy?: Cy;

  /**
   * Callback triggered on delete
   */
  onDelete: () => void;

  /**
   * Callback triggered on update
   */
  onUpdate?: (request: UpdateContactRequest) => void;
}

/**
 * Tag with avatar component
 */
export const ContactTag = (props: TagProps) => {
  const {language} = languageStore;

  const processedContactLink = props.contactLink.replace(/^(https?:\/\/)?/, "").split("/")[0];

  /**
   *I added this function to make sure if user enters a link without http or https,it can be opened
   */
  const makeUrlAbsolute = (url: string): string => {
    if (!/^https?:\/\//i.test(url)) {
      return `http://${url}`;
    }

    return url;
  };

  const absoluteURL = makeUrlAbsolute(props.contactLink);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const removeButton = (
    <Confirm
      trigger={
        <Button
          className={styles.removeButton}
          dataCy={props.cy?.dataCyCross}
          buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
          onClick={() => {}}
          value={
            <Icon
              size={IconSize.SMALL}
              name="RemoveIcon"
              className={styles.actionButtonIcon}
            />
          }
        />
      }
      content={
        <div>
          <p>
            {LanguageService.user.personalInfo.deleteButtonConfirmation[language]}
          </p>
        </div>
      }
      onOk={props.onDelete}
      okText={LanguageService.user.personalInfo.deleteContactButton[language]}
      cancelText={LanguageService.modals.promptModal.cancelButton[language]}
      cy={{
        onOk: "delete-contact-confirm-ok",
        onCancel: "delete-contact-confirm-cancel",
        onEnter: "delete-contact-confirm-dialog",
      }}
    />
  );

  const updateButton = (
    <Tooltip content={LanguageService.user.personalInfo.updateContactModal[language]}>
      <Button
        className={styles.updateButton}
        onClick={() => setIsUpdateModalOpen(true)}
        dataCy={props.cy?.dataCyUpdate}
        buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
        value={
          <Icon
            size={IconSize.SMALL}
            name="PenToolIcon"
            className={styles.actionButtonIcon}
          />}
      />
    </Tooltip>);

  const avatarWithLink = (
    <a
      href={absoluteURL}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Avatar
        src={`https://img.logo.dev/${processedContactLink}?token=pk_LceEaDNtTWGchSCHHEvxHQ`}
        alt={`${processedContactLink} logo`}
      />
    </a>
  );

  return (
    <div
      className={styles.tag}
      data-cy={props.cy?.dataCyTag}
      role="note"
    >
      <div className={styles.tagContent}>
        {props.description
          ? (
            <Tooltip content={props.description}>
              {avatarWithLink}
            </Tooltip>
          )
          : avatarWithLink
        }
      </div>

      {props.isDeletable && (
        <div className={styles.tagAction}>
          {removeButton}
          {updateButton}
          <Modal
            trigger={updateButton}
            content={
              <ContactsModalContent
                userId={props.userId}
                initialContact={{
                  uuid: props.contactId,
                  contactLink: props.contactLink,
                  description: props.description,
                }}
                close={() => setIsUpdateModalOpen(false)}
                onUpdate={(updatedContact) => {
                  if (props.onUpdate) {
                    props.onUpdate(updatedContact);
                  }
                }}
                cy={{
                  dataCyInput: userPersonalDataAccessIds.userContactsBlock.contactsModalContent.contactLinkInput,
                  dataCyUpdateButton: userPersonalDataAccessIds.userContactsBlock.contactsModalContent.updateContactButton,
                  dataCyCancel: userPersonalDataAccessIds.userContactsBlock.contactsModalContent.cancelButton,
                }}
              />
            }
            isOpen={isUpdateModalOpen}
          />
        </div>
      )}
    </div>
  );
};
