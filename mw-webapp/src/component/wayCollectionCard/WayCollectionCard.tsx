import {useState} from "react";
import clsx from "clsx";
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
import styles from "src/component/wayCollectionCard/WayCollectionCard.module.scss";

/**
 * WayCollection props
 */
interface WayCollectionProps {

  /**
   * Show is wayCollection render ways in the ways table
   */
  isActive: boolean;

  /**
   * Collection title
   */
  collectionTitle: string;

  /**
   * Collection ways amount
   */
  collectionWaysAmount: number;

  /**
   * Callback triggered on WayCollection click
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
 * WayCollectionCard component
 */
export const WayCollectionCard = (props: WayCollectionProps) => {
  const [isRenameCollectionModalOpen, setIsRenameCollectionModalOpen] = useState(false);
  const title = (
    <Title
      level={HeadingLevel.h3}
      text={props.collectionTitle}
      className={styles.title}
      placeholder=""
    />);
  const editModal = (
    <Modal
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
        />
      }
      trigger={<>
        {LanguageService.user.collections.renameCollection[props.language]}
      </>}
    />);
  const deleteConfirm = (
    <Confirm
      trigger={
        <>
          {LanguageService.user.collections.deleteCollection[props.language]}
        </>
      }
      content={<p>
        {`${LanguageService.user.collections.deleteCollectionModalQuestion[props.language]} "${props.collectionTitle}" ?`}
      </p>}
      onOk={() => props.onDelete && props.onDelete()}
      okText={LanguageService.modals.confirmModal.deleteButton[props.language]}
      cancelText={LanguageService.modals.confirmModal.cancelButton[props.language]}
    />);

  return (
    <Button
      dataCy={props.dataCy}
      onClick={props.onClick}
      className={styles.wayCollectionCardButton}
      value={
        <VerticalContainer className={styles.wayCollectionCardContainer}>
          <VerticalContainer className={clsx(styles.mainInfo, props.isActive && styles.active)}>
            {props.isEditable ?
              <HorizontalContainer className={styles.collectionTitleBlock}>
                {title}
                <Dropdown
                  className={styles.dropdown}
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
                      />
                    </Tooltip>
                  )}
                  dropdownMenuItems={[
                    {
                      id: "Edit",
                      value: editModal,
                    },
                    {
                      id: "Delete",
                      value: deleteConfirm,
                    },
                  ]}
                />
              </HorizontalContainer> :
              title}
          </VerticalContainer>
          <HorizontalContainer className={styles.additionalInfo}>
            {`${props.collectionWaysAmount} ${LanguageService.user.collections.ways[props.language]}`}
          </HorizontalContainer>
        </VerticalContainer>
      }
    />
  );
};

