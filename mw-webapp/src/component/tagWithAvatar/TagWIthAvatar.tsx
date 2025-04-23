import {useState} from "react";
import {userPersonalDataAccessIds} from "cypress/accessIds/userPersonalDataAccessIds";
import {Avatar} from "src/component/avatar/Avatar";
import {Button, ButtonType} from "src/component/button/Button";
import {Icon, IconSize} from "src/component/icon/Icon";
import {ContactsModalContent} from "src/component/modal/ContactsModalContent";
import {Modal} from "src/component/modal/Modal";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {languageStore} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/component/tagWithAvatar/TagWithAvatar.module.scss";

/**
 * Interface for data-cy attributes
 */
interface Cy {

  /**
   * Data attribute for cross button
   */
  dataCyCross?: string;

  /**
   * Data attribute for tag
   */
  dataCyTag?: string;

  /**
   * Data attribute for update button
   */
  dataCyUpdate?: string;
}

/**
 * Interface for update contact data
 */
interface UpdateContactData {

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
 * Interface for update contact request
 */
interface UpdateContactRequest {

  /**
   * User ID
   */
  userId: string;

  /**
   * Contact ID
   */
  contactId: string;

  /**
   * Update payload
   */
  request: UpdateContactData;
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
  onUpdate: (request: UpdateContactRequest) => void;
}

/**
 * Tag with avatar component
 */
export const TagWithAvatar = (props: TagProps) => {
  const {language} = languageStore;
  const processedContactLink = props.contactLink.replace(/^(https?:\/\/)?/, "").split("/")[0];
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const removeButton = (
    <Button
      className={styles.removeButton}
      onClick={() => props.onDelete && props.onDelete()}
      dataCy={props.cy?.dataCyCross}
      buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
      value={
        <Icon
          size={IconSize.SMALL}
          name="RemoveIcon"
          className={styles.actionButtonIcon}
        />}
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
      href={props.contactLink}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Avatar
        src={`https://img.logo.dev/${processedContactLink}?token=pk_LceEaDNtTWGchSCHHEvxHQ`}
        alt='logo'
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
                cy={{
                  dataCyInput: userPersonalDataAccessIds.userContactsBlock.contactsModalContent.contactLinkInput,
                  dataCyCreateButton: userPersonalDataAccessIds.userContactsBlock.contactsModalContent.createContactButton,
                }}
                contactLink={props.contactLink}
                contactDescription={props.description ?? ""}
                title={LanguageService.user.personalInfo.addContactModalTitle[language]}
                close={() => setIsUpdateModalOpen(false)}
                onOk={(contactLink: string, contactDescription: string) => {
                  props.onUpdate && props.onUpdate({
                    userId: props.userId,
                    contactId: props.contactId,
                    request: {
                      contactLink,
                      description: contactDescription,
                    },
                  });
                  setIsUpdateModalOpen(false);
                }}
                okButtonValue={LanguageService.user.personalInfo.addContactModal[language]}
                cancelButtonValue={LanguageService.modals.promptModal.cancelButton[language]}
              />
            }
            isOpen={isUpdateModalOpen}
            close={() => setIsUpdateModalOpen(false)}
          />
        </div>
      )}
    </div>
  );
};
