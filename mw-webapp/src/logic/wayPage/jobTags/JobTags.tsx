import {useState} from "react";
import {TrashIcon} from "@radix-ui/react-icons";
import {Button} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Modal} from "src/component/modal/Modal";
import {PromptModalContent} from "src/component/modal/PromptModalContent";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {JobTagDAL} from "src/dataAccessLogic/JobTagDAL";
import {useGlobalContext} from "src/GlobalContext";
import {JobTag} from "src/logic/wayPage/jobTags/jobTag/JobTag";
import {JobTag as JobTagData} from "src/model/businessModelPreview/WayPreview";
import {LanguageService} from "src/service/LangauageService";
import {getColorByString} from "src/utils/getColorByString";
import styles from "src/logic/wayPage/jobTags/JobTags.module.scss";

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
export const JobTags = (props: JobTagsProps) => {
  const {language} = useGlobalContext();
  const [isJobDoneModalOpen, setIsJobDoneModalOpen] = useState<boolean>(false);
  // Const allJobTags = props.jobTags.filter((tag) => tag.name !== "no tag");
  const isJobTagsEmpty = props.jobTags.length === 0;

  /**
   * Remove job tag from Way
   */
  const removeJobTagFromWay = async (jobTagToRemoveUuid: string) => {
    const updatedJobTags = props.jobTags.filter((jobTag) => jobTag.uuid !== jobTagToRemoveUuid);

    await JobTagDAL.deleteJobTag(jobTagToRemoveUuid);
    props.updateTags(updatedJobTags);
  };

  /**
   * Create job tag
   */
  const createJobTag = async (newJobTag: string) => {
    const randomColor = getColorByString(newJobTag);
    const jobTag = await JobTagDAL.createJobTag(props.wayUuid, newJobTag, randomColor);
    const updatedJobTags = props.jobTags.concat(jobTag);

    await props.updateTags(updatedJobTags);

    setIsJobDoneModalOpen(false);
  };

  return (
    <div className={styles.jobTags}>
      {isJobTagsEmpty &&
        <div className={styles.jobTags}>
          No tags
        </div>
      }
      {props.jobTags.map((jobTag) => {
        return (
          <div
            key={jobTag.uuid}
            className={styles.jobTags}
          >
            <JobTag jobTag={jobTag} />
            {props.isEditable && (
              <Tooltip
                content={LanguageService.way.filterBlock.deleteFromJobTags[language]}
                position={PositionTooltip.RIGHT}
              >
                <Confirm
                  trigger={
                    <TrashIcon className={styles.icon} />}
                  content={<p>
                    {LanguageService.way.filterBlock.deleteJobTagQuestion[language].replace("$jobTag", `"${jobTag.name}"`)}
                  </p>}
                  onOk={() => removeJobTagFromWay(jobTag.uuid)}
                  okText={LanguageService.way.filterBlock.deleteButton[language]}
                />
              </Tooltip>
            )}
          </div>
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
            />
          }
          trigger={
            <Button
              value={LanguageService.way.filterBlock.addTagButton[language]}
              onClick={() => setIsJobDoneModalOpen(true)}
            />
          }
        />}
    </div>
  );
};
