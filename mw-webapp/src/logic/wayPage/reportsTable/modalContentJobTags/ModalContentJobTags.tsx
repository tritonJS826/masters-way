import {useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {JobTag} from "src/logic/wayPage/jobTags/jobTag/JobTag";
import {DEFAULT_TAG} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/logic/wayPage/reportsTable/modalContentJobTags/ModalContentJobTags.module.scss";

/**
 * JobDoneTagsProps
 */
interface JobDoneTagsProps {

  /**
   * Job done tags
   */
  jobDoneTags: string[];

  /**
   * All Job done tags in way
   */
  jobTags: string[];

  /**
   * Is editable
   * @default false
   */
  isEditable: boolean;

  /**
   * Callback to update job done tags
   */
  updateTags: (newTags: string[]) => Promise<void>;

}

/**
 * Modal content job tags
 */
export const ModalContentJobTags = (props: JobDoneTagsProps) => {
  const [jobTagsUpdated, setJobTagsUpdated] = useState<string[]>(props.jobDoneTags);

  const uniqueJobTags = Array.from(new Set(jobTagsUpdated));

  const allTags = Array.from(new Set(props.jobTags.concat(props.jobDoneTags).filter((tag) => tag !== DEFAULT_TAG)));

  /**
   * Remove job tag from Job done
   */
  const removeJobTagFromJobDone = (jobTagToRemove: string) => {
    const updatedJobTags = jobTagsUpdated.filter((jobTag) => jobTag !== jobTagToRemove);

    setJobTagsUpdated(updatedJobTags);
  };

  /**
   * Add job tag to Job done
   */
  const addJobTagFromJobDone = (jobTagToAdd: string) => {
    const updatedJobTags = jobTagsUpdated.concat(jobTagToAdd);

    setJobTagsUpdated(updatedJobTags);
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {
      props.updateTags(uniqueJobTags);
    }
  };

  return (
    <div onKeyDown={handleEnter}>
      <div className={styles.jobTagsContainer}>
        {allTags.map((tag) => {
          return (
            <div
              key={tag}
              className={styles.jobTags}
              onClick={() => jobTagsUpdated.includes(tag) ? removeJobTagFromJobDone(tag) : addJobTagFromJobDone(tag)}
            >
              <Tooltip
                content={jobTagsUpdated.includes(tag) ? "Click to remove tag" : "Click to add tag"}
                position={PositionTooltip.BOTTOM}
              >
                <Checkbox
                  isDefaultChecked={jobTagsUpdated.includes(tag)}
                  onChange={() => {}}
                  className={styles.checkbox}
                />
                <JobTag jobTag={tag} />
              </Tooltip>
            </div>
          );
        })}
      </div>
      <HorizontalContainer className={styles.buttons}>
        <DialogClose asChild>
          <Button
            value="Cancel"
            onClick={() => {}}
          />
        </DialogClose>
        <DialogClose asChild>
          <Button
            value="Save"
            onClick={() => props.updateTags(uniqueJobTags)}
            buttonType={ButtonType.PRIMARY}
          />
        </DialogClose>
      </HorizontalContainer>
    </div>
  );
};
