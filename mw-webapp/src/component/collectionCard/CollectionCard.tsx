import {useState} from "react";
import clsx from "clsx";
import {userWaysAccessIds} from "cypress/accessIds/userWaysAccessIds";
import {Button, ButtonType} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Dropdown} from "src/component/dropdown/Dropdown";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Icon, IconSize} from "src/component/icon/Icon";
import {Modal} from "src/component/modal/Modal";
import {PromptModalContent} from "src/component/modal/PromptModalContent";
import {HeadingLevel, Title} from "src/component/title/Title";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {Language} from "src/globalStore/LanguageStore";
import {LanguageService} from "src/service/LanguageService";
import styles from "src/component/collectionCard/CollectionCard.module.scss";

/**
 * Collection props
 */
interface CollectionProps {

  /**
   * Show is Collection active
   */
  isActive: boolean;

  /**
   * Collection title
   */
  collectionTitle: string;

  /**
   * Collection amount title
   */
  collectionAmountTitle: string;

  /**
   * Collections amount
   */
  collectionsAmount: number;

  /**
   * Callback triggered on Collection click
   */
  onClick: () => void;

  /**
   * Actual language
   */
  language: Language;

  /**
   * Data attribute for cypress testing
   */
  dataCy?: string;

  /**
   * If a card editable and removable
   * @default false
   */
  isEditable?: boolean;

  /**
   * Callback triggered on title edit
   */
  onTitleEdit?: (name: string) => void;

  /**
   * Callback triggered on collection delete
   */
  onDelete?: () => void;
}

/**
 * CollectionCard component
 */
export const CollectionCard = (props: CollectionProps) => {
  const [isRenameCollectionModalOpen, setIsRenameCollectionModalOpen] = useState(false);

  const deleteConfirm = (
    <Confirm
      trigger={<>
        {LanguageService.user.collections.deleteCollection[props.language]}
      </>}
      content={<p>
        {`${LanguageService.user.collections.deleteCollectionModalQuestion[props.language]} "${props.collectionTitle}" ?`}
      </p>}
      onOk={() => props.onDelete && props.onDelete()}
      okText={LanguageService.modals.confirmModal.deleteButton[props.language]}
      cancelText={LanguageService.modals.confirmModal.cancelButton[props.language]}
      cy={
        {
          onOk: userWaysAccessIds.collectionBlock.customCollection.deleteDialog.deleteButton,
          onEnter: userWaysAccessIds.collectionBlock.customCollection.deleteDialog.content,
        }
      }
    />);

  return (
    <Button
      dataCy={props.dataCy}
      onClick={props.onClick}
      className={styles.collectionCardButton}
      value={
        <VerticalContainer className={styles.collectionCardContainer}>
          <VerticalContainer
            className={clsx(styles.mainInfo, props.isActive && styles.active)}
            dataCy={userWaysAccessIds.collectionBlock.collectionButtonMainInfo}
          >
            <HorizontalContainer className={styles.collectionTitleBlock}>
              <Title
                level={HeadingLevel.h3}
                text={props.collectionTitle}
                className={styles.title}
                classNameHeading={styles.headingLevelH3}
                placeholder=""
              />
              {isRenameCollectionModalOpen &&
              <Modal
                close={() => setIsRenameCollectionModalOpen(false)}
                isOpen={isRenameCollectionModalOpen}
                content={
                  <PromptModalContent
                    defaultValue={props.collectionTitle}
                    placeholder="Collection name"
                    close={() => setIsRenameCollectionModalOpen(false)}
                    onOk={(name: string) => {
                      props.onTitleEdit && props.onTitleEdit(name);
                      setIsRenameCollectionModalOpen(false);
                    }}
                    okButtonValue={LanguageService.modals.promptModal.okButton[props.language]}
                    cancelButtonValue={LanguageService.modals.promptModal.cancelButton[props.language]}
                    cy={
                      {
                        dataCyCreateButton: userWaysAccessIds.collectionBlock.customCollection.renameDialog.okButton,
                        dataCyInput: userWaysAccessIds.collectionBlock.customCollection.renameDialog.input,
                      }
                    }
                  />
                }
                trigger={<></>}
                cy={{dataCyContent: {dataCyContent: userWaysAccessIds.collectionBlock.customCollection.renameDialog.content}}}
              />
              }

              {props.isEditable &&
                <Dropdown
                  trigger={(
                    <Tooltip
                      content={LanguageService.user.collections.collectionActionsTooltip[props.language]}
                      position={PositionTooltip.LEFT}
                    >
                      <Button
                        buttonType={ButtonType.ICON_BUTTON_WITHOUT_BORDER}
                        onClick={() => {}}
                        icon={
                          <Icon
                            size={IconSize.MEDIUM}
                            name={"MoreVertical"}
                          />
                        }
                        dataCy={userWaysAccessIds.collectionBlock.customCollection.actionMenuButton}
                      />
                    </Tooltip>
                  )}
                  cy={{
                    dataCyContent: userWaysAccessIds.collectionBlock.customCollection.actionMenuItem,
                    dataCyContentList: userWaysAccessIds.collectionBlock.customCollection.actionMenuList,
                  }}

                  dropdownMenuItems={[
                    {
                      dropdownSubMenuItems: [
                        {
                          id: "Edit",
                          value: LanguageService.user.collections.renameCollection[props.language],
                          isPreventDefaultUsed: false,

                          /**
                           * Open rename collection modal
                           */
                          onClick: () => setIsRenameCollectionModalOpen(true),
                        },
                        {
                          id: "Delete",
                          value: deleteConfirm,
                          isPreventDefaultUsed: true,
                        },
                      ],
                    },

                  ]}
                />
              }
            </HorizontalContainer>
          </VerticalContainer>
          <HorizontalContainer
            className={styles.additionalInfo}
            dataCy={userWaysAccessIds.collectionBlock.amountCollectionButton}
          >
            {`${props.collectionAmountTitle}: ${props.collectionsAmount}`}
          </HorizontalContainer>
        </VerticalContainer>
      }
    />
  );
};

