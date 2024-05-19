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
import {JobTag, JobTag as JobTagData} from "src/model/businessModelPreview/WayPreview";
import {LanguageService} from "src/service/LanguageService";
import {getColorByString} from "src/utils/getColorByString";
import styles from "src/logic/wayPage/labels/AdjustLabelsModalContent.module.scss";

/**
 * Job tags props
 */
interface JobTagsProps {

  /**
   * Job tags
   */
  jobTags: JobTagData[];

  /**
   * Is editable
   * @default false
   */
  isEditable: boolean;

  /**
   * Callback to update job tags
   */
  updateTags: (newTags: JobTagData[]) => Promise<void>;

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
   * Remove job tag from Way
   */
  const removeJobTagFromWay = async (jobTagToRemoveUuid: string) => {
    const updatedJobTags = props.jobTags.filter((jobTag) => jobTag.uuid !== jobTagToRemoveUuid);

    await LabelDAL.deleteLabel(jobTagToRemoveUuid);
    props.updateTags(updatedJobTags);
  };

  /**
   * Update label in the way
   */
  const updateLabelInWay = async (label: JobTag) => {
    const updatedJobTags = props.jobTags.map(oldLabel => {
      if (label.uuid === oldLabel.uuid) {
        return label;
      } else {
        return oldLabel;
      }
    });

    await LabelDAL.updateLabel(label);
    props.updateTags(updatedJobTags);

  };

  /**
   * Create job tag
   */
  const createJobTag = async (newJobTag: string) => {
    const randomColor = getColorByString(newJobTag);
    const jobTag = await LabelDAL.createLabel(props.wayUuid, newJobTag, randomColor);
    const updatedJobTags = props.jobTags.concat(jobTag);

    await props.updateTags(updatedJobTags);

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
            onUpdateLabel={updateLabelInWay}
            onRemoveLabel={removeJobTagFromWay}
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
              onOk={createJobTag}
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
