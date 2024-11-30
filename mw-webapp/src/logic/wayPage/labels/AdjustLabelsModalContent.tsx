import {useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {observer} from "mobx-react-lite";
import {Button, ButtonType} from "src/component/button/Button";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {Modal} from "src/component/modal/Modal";
import {PromptModalContent} from "src/component/modal/PromptModalContent";
import {HeadingLevel, Title} from "src/component/title/Title";
import {VerticalContainer} from "src/component/verticalContainer/VerticalContainer";
import {LabelDAL} from "src/dataAccessLogic/LabelDAL";
import {languageStore} from "src/globalStore/LanguageStore";
import {LabelLine} from "src/logic/wayPage/labels/LabelLine";
import {Label} from "src/model/businessModel/Label";
import {LanguageService} from "src/service/LanguageService";
import {getColorByString} from "src/utils/getColorByString";
import styles from "src/logic/wayPage/labels/AdjustLabelsModalContent.module.scss";

/**
 * Labels block props
 */
interface LabelsBlockProps {

  /**
   * Labels
   */
  labels: Label[];

  /**
   * Is editable
   * @default false
   */
  isEditable: boolean;

  /**
   * Callback to add label
   */
  addLabel: (label: Label) => void;

  /**
   * Callback to delete label
   */
  deleteLabel: (labelUuid: string) => void;

  /**
   * Way's uuid
   */
  wayUuid: string;
}

/**
 * Adjust labels modal content
 */
export const AdjustLabelsBlock = observer((props: LabelsBlockProps) => {
  const {language} = languageStore;
  const [isJobDoneModalOpen, setIsJobDoneModalOpen] = useState<boolean>(false);

  /**
   * Remove label from Way
   */
  const removeLabelFromWay = async (labelUuid: string) => {
    props.deleteLabel(labelUuid);
    await LabelDAL.deleteLabel(labelUuid);
  };

  /**
   * Create job tag
   */
  const createLabel = async (labelName: string) => {
    const randomColor = getColorByString(labelName);
    const label = await LabelDAL.createLabel(props.wayUuid, labelName, randomColor);
    props.addLabel(label);
    setIsJobDoneModalOpen(false);
  };

  return (
    <VerticalContainer className={styles.adjustLabelsContent}>
      <Title
        level={HeadingLevel.h2}
        text={LanguageService.way.filterBlock.labelsModalTitle[language]}
        placeholder=""
      />

      <VerticalContainer className={styles.labelsContainer}>
        {props.labels.map((label) => {
          return (
            <LabelLine
              onRemoveLabel={removeLabelFromWay}
              key={label.uuid}
              label={label}
              isEditable={props.isEditable}
            />
          );
        })
        }
      </VerticalContainer>
      <HorizontalContainer className={styles.labelsButtons}>
        <DialogClose asChild>
          <Button
            value={LanguageService.modals.promptModal.cancelButton[language]}
            onClick={() => {}}
          />
        </DialogClose>
        {props.isEditable &&
        <Modal
          isOpen={isJobDoneModalOpen}
          content={
            <PromptModalContent
              placeholder={LanguageService.way.filterBlock.labelPlaceholder[language]}
              close={() => setIsJobDoneModalOpen(false)}
              onOk={createLabel}
              okButtonValue={LanguageService.modals.promptModal.okButton[language]}
              cancelButtonValue={LanguageService.modals.promptModal.cancelButton[language]}
            />
          }
          trigger={
            <Button
              value={LanguageService.way.filterBlock.addTagButton[language]}
              onClick={() => setIsJobDoneModalOpen(true)}
              buttonType={ButtonType.PRIMARY}
            />
          }
        />}
      </HorizontalContainer>
    </VerticalContainer>
  );
});
