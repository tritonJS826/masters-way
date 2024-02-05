import {useState} from "react";
import {TrashIcon} from "@radix-ui/react-icons";
import {Button} from "src/component/button/Button";
import {Confirm} from "src/component/confirm/Confirm";
import {Modal} from "src/component/modal/Modal";
import {PromptModalContent} from "src/component/modal/PromptModalContent";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {JobTag} from "src/logic/wayPage/jobTags/jobTag/JobTag";
import styles from "src/logic/wayPage/jobTags/JobTags.module.scss";

/**
 * Job tags props
 */
interface JobTagsProps {

  /**
   * Is visible
   * @default true
   */
  isVisible: boolean;

  /**
   * Job tags
   */
  jobTags: string[];

  /**
   * Is editable
   * @default false
   */
  isEditable: boolean;

  /**
   * Callback to update job tags
   */
  updateTags: (newTags: string[]) => Promise<void>;
}

/**
 * Job tags
 */
export const JobTags = (props: JobTagsProps) => {
  if (!props.isVisible) {
    return null;
  }

  const [isJobDoneModalOpen, setIsJobDoneModalOpen] = useState<boolean>(false);

  /**
   * Remove job tag from Way
   */
  const removeJobTagFromWay = (jobTagToRemove: string) => {
    const updatedJobTags = props.jobTags.filter((jobTag) => jobTag !== jobTagToRemove);

    props.updateTags(updatedJobTags);
  };

  /**
   * Create job tag
   */
  const createJobTag = async (newJobTag: string) => {
    const updatedJobTags = props.jobTags.concat(newJobTag);

    await props.updateTags(updatedJobTags);

    setIsJobDoneModalOpen(false);
  };

  return (
    <div className={styles.jobTags}>
      {props.jobTags.map((jobTag) => {
        return (
          <div
            key={jobTag}
            className={styles.jobTags}
          >
            <JobTag jobTag={jobTag} />
            {props.isEditable && (
              <Tooltip
                content="Delete from job tags"
                position={PositionTooltip.RIGHT}
              >
                <Confirm
                  trigger={
                    <TrashIcon className={styles.icon} />}
                  content={<p>
                    {`Are you sure you want to remove "${jobTag}" from job tags"?`}
                  </p>}
                  onOk={() => removeJobTagFromWay(jobTag)}
                  okText="Delete"
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
              close={() => setIsJobDoneModalOpen(false)}
              onOk={createJobTag}
            />
          }
          trigger={
            <Button
              value="Add tag"
              onClick={() => setIsJobDoneModalOpen(true)}
            />
          }
        />}
    </div>
  );
};
