import {useState} from "react";
import {TrashIcon} from "@radix-ui/react-icons";
import {Button} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Modal} from "src/component/modal/Modal";
import {PromptModalContent} from "src/component/modal/PromptModalContent";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {useGlobalContext} from "src/GlobalContext";
import {JobTag} from "src/logic/wayPage/jobTags/jobTag/JobTag";
import {JobTag as JobTagData} from "src/model/businessModelPreview/WayPreview";
import {LanguageService} from "src/service/LangauageService";
import {getColorByString} from "src/utils/getColorByString";
import {v4 as uuidv4} from "uuid";
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
}

/**
 * Job tags
 */
export const JobTags = (props: JobTagsProps) => {
  const {language} = useGlobalContext();
  const [isJobDoneModalOpen, setIsJobDoneModalOpen] = useState<boolean>(false);
  const allJobTags = props.jobTags.filter((tag) => tag.name !== "no tag");

  /**
   * Remove job tag from Way
   */
  const removeJobTagFromWay = (jobTagToRemove: string) => {
    const updatedJobTags = props.jobTags.filter((jobTag) => jobTag.uuid !== jobTagToRemove);

    props.updateTags(updatedJobTags);
  };

  /**
   * Create job tag
   */
  const createJobTag = async (newJobTag: string) => {
    const randomColor = getColorByString(newJobTag);
    const updatedJobTags = props.jobTags.concat({
      uuid: uuidv4(),
      name: newJobTag,
      description: "",
      color: randomColor,
    });

    await props.updateTags(updatedJobTags);

    setIsJobDoneModalOpen(false);
  };

  return (
    <div className={styles.jobTags}>
      {allJobTags.map((jobTag) => {
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
                  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                  onOk={() => removeJobTagFromWay(jobTag.uuid!)}
                  okText={LanguageService.way.filterBlock.deleteButton[language]}
                />
              </Tooltip>
            )}
          </div>
        );
      })}

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
