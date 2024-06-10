import {useState} from "react";
import {observer} from "mobx-react-lite";
import {Button} from "src/component/button/Button";
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
 * Job tags props
 */
interface JobTagsProps {

  /**
   * Labels
   */
  jobTags: Label[];

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
 * Job tags
 */
export const AdjustLabelsBlock = observer((props: JobTagsProps) => {
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
        level={HeadingLevel.h3}
        text={LanguageService.way.filterBlock.jobDoneTagsModalTitle[language]}
        placeholder=""
      />
      {props.jobTags.map((label) => {
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

      {props.isEditable &&
        <Modal
          isOpen={isJobDoneModalOpen}
          content={
            <PromptModalContent
              placeholder={LanguageService.way.filterBlock.jobTagPlaceholder[language]}
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
            />
          }
        />}
    </VerticalContainer>
  );
});
