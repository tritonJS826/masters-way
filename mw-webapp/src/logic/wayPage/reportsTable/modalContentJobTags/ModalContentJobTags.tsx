import {useState} from "react";
import {Close as DialogClose} from "@radix-ui/react-dialog";
import {Button, ButtonType} from "src/component/button/Button";
import {Checkbox} from "src/component/checkbox/Сheckbox";
import {HorizontalContainer} from "src/component/horizontalContainer/HorizontalContainer";
import {PositionTooltip} from "src/component/tooltip/PositionTooltip";
import {Tooltip} from "src/component/tooltip/Tooltip";
import {JobTag} from "src/logic/wayPage/jobTags/jobTag/JobTag";
import {JobTag as JobTagData} from "src/model/businessModelPreview/WayPreview";
import {KeySymbols} from "src/utils/KeySymbols";
import styles from "src/logic/wayPage/reportsTable/modalContentJobTags/ModalContentJobTags.module.scss";

const DEFAULT_AMOUNT_TAGS = 1;

/**
 * JobDoneTagsProps
 */
interface JobDoneTagsProps {

  /**
   * Job done tags
   */
  jobDoneTags: JobTagData[];

  /**
   * All Job done tags in way
   */
  jobTags: JobTagData[];

  /**
   * Is editable
   * @default false
   */
  isEditable: boolean;

  /**
   * Callback to update job done tags
   */
  updateTags: (newTags: JobTagData[]) => Promise<void>;

}

/**
 * Modal content job tags
 */
export const ModalContentJobTags = (props: JobDoneTagsProps) => {
  const [jobTagsUpdated, setJobTagsUpdated] = useState<JobTagData[]>(props.jobDoneTags);
  const defaultTag = props.jobTags.find((tag) => tag.name === "no tag");

  if (!defaultTag) {
    throw new Error("Default tag is not exist");
  }

  const isJobTagsEmpty = jobTagsUpdated.length === 0;
  const isJobTagsSingle = jobTagsUpdated.length === DEFAULT_AMOUNT_TAGS;

  const filteredJobTags = isJobTagsSingle
    ? jobTagsUpdated
    : Array.from(new Set(jobTagsUpdated)).filter((tag) => tag.name !== "no tag");

  const checkedJobTags = isJobTagsEmpty
    ? jobTagsUpdated.concat(defaultTag)
    : filteredJobTags;

  const allTagsMap = new Map(props.jobTags.concat(checkedJobTags).map((tag) => [tag.uuid, tag]));

  const allTagsUnique = Array.from(allTagsMap, ([, value]) => value);

  const allTags = allTagsUnique.filter((tag) => tag.name !== defaultTag.name);

  /**
   * Remove job tag from Job done
   */
  const removeJobTagFromJobDone = (jobTagToRemove: string) => {
    const updatedJobTags = jobTagsUpdated.filter((jobTag) => jobTag.uuid !== jobTagToRemove);

    setJobTagsUpdated(updatedJobTags);
  };

  /**
   * Add job tag to Job done
   */
  const addJobTagFromJobDone = (jobTagToAdd: JobTagData) => {
    const updatedJobTags = jobTagsUpdated.concat(jobTagToAdd);

    setJobTagsUpdated(updatedJobTags);
  };

  /**
   * Update cell value after OnKeyDown event
   */
  const handleEnter = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === KeySymbols.ENTER) {
      props.updateTags(checkedJobTags);
    }
  };

  return (
    <div onKeyDown={handleEnter}>
      <div className={styles.jobTagsContainer}>
        {allTags.map((tag) => {
          return (
            <div
              key={tag.uuid}
              className={styles.jobTags}
              onClick={() => jobTagsUpdated.includes(tag) ? removeJobTagFromJobDone(tag.uuid) : addJobTagFromJobDone(tag)}
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
            onClick={() => props.updateTags(checkedJobTags)}
            buttonType={ButtonType.PRIMARY}
          />
        </DialogClose>
      </HorizontalContainer>
    </div>
  );
};
