import {useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {JobTag} from "src/logic/wayPage/jobTags/jobTag/JobTag";
import {DEFAULT_TAG} from "src/logic/wayPage/reportsTable/reportsColumns/ReportsColumns";
import styles from "src/logic/wayPage/reportsTable/modalContentJobTags/ModalContentJobTags.module.scss";

const DEFAULT_AMOUNT_TAGS = 1;

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

  const isJobTagsEmpty = jobTagsUpdated.length === 0;
  const isJobTagsSingle = jobTagsUpdated.length === DEFAULT_AMOUNT_TAGS;

  const filteredJobTags = isJobTagsSingle
    ? jobTagsUpdated
    : Array.from(new Set(jobTagsUpdated)).filter((tag) => tag !== "no tag");

  const checkedJobTags = isJobTagsEmpty
    ? jobTagsUpdated.concat("no tag")
    : filteredJobTags;

  const allTags = Array.from(new Set(props.jobTags.concat(checkedJobTags).filter((tag) => tag !== DEFAULT_TAG)));

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

  return (
    <>
      <div className={styles.jobTagsContainer}>
        {allTags.map((tag) => {
          return (
            <div
              key={tag}
              className={styles.jobTags}
            >
              <Tooltip
                content={props.jobDoneTags.includes(tag) ? "Click to remove tag" : "Click to add tag"}
                position={PositionTooltip.RIGHT}
              >
                <Checkbox
                  isDefaultChecked={props.jobDoneTags.includes(tag)}
                  onChange={() => props.jobDoneTags.includes(tag) ? removeJobTagFromJobDone(tag) : addJobTagFromJobDone(tag)}
                />
              </Tooltip>
              <JobTag jobTag={tag} />
            </div>
          );
        })}
      </div>
      <HorizontalContainer className={styles.buttons}>
        <DialogClose asChild>
          <Button
            value="Save"
            onClick={() => props.updateTags(checkedJobTags)}
          />
        </DialogClose>
      </HorizontalContainer>
    </>
  );
};
